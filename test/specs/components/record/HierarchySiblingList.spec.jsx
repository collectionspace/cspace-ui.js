import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-addons-test-utils';
import Immutable from 'immutable';
import { findAllWithType } from 'react-shallow-testutils';
import createTestContainer from '../../../helpers/createTestContainer';
import AutocompleteInputContainer from '../../../../src/containers/input/AutocompleteInputContainer';
import HierarchySiblingList from '../../../../src/components/record/HierarchySiblingList';

chai.should();

describe('HierarchySiblingList', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<HierarchySiblingList />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render a header with the supplied title', function test() {
    const title = 'Siblings';

    render(
      <HierarchySiblingList
        title={title}
      />, this.container);

    this.container.querySelector('header').textContent.should.equal(title);
  });

  it('should render a header with the supplied title', function test() {
    const title = 'Siblings';

    render(
      <HierarchySiblingList
        title={title}
      />, this.container);

    this.container.querySelector('header').textContent.should.equal(title);
  });

  it('should call findRelations when mounted', function test() {
    const config = {};
    const parentCsid = '1111';
    const recordType = 'person';

    let findConfig = null;
    let findSubject = null;
    let findObject = null;
    let findPredicate = null;

    const findRelations = (configArg, subjectArg, objectArg, predicateArg) => {
      findConfig = configArg;
      findSubject = subjectArg;
      findObject = objectArg;
      findPredicate = predicateArg;
    };

    render(
      <HierarchySiblingList
        config={config}
        parentCsid={parentCsid}
        recordType={recordType}
        findRelations={findRelations}
      />, this.container);

    findConfig.should.equal(config);
    findSubject.should.deep.equal({ recordType });
    findObject.should.deep.equal({ csid: parentCsid, recordType });
    findPredicate.should.equal('hasBroader');
  });

  it('should call findRelations when parentCsid is changed', function test() {
    const config = {};
    const parentCsid = '1111';
    const recordType = 'person';

    let findConfig = null;
    let findSubject = null;
    let findObject = null;
    let findPredicate = null;

    const findRelations = (configArg, subjectArg, objectArg, predicateArg) => {
      findConfig = configArg;
      findSubject = subjectArg;
      findObject = objectArg;
      findPredicate = predicateArg;
    };

    render(
      <HierarchySiblingList
        config={config}
        parentCsid={parentCsid}
        recordType={recordType}
      />, this.container);

    const newParentCsid = '2222';

    render(
      <HierarchySiblingList
        config={config}
        parentCsid={newParentCsid}
        recordType={recordType}
        findRelations={findRelations}
      />, this.container);

    findConfig.should.equal(config);
    findSubject.should.deep.equal({ recordType });
    findObject.should.deep.equal({ csid: newParentCsid, recordType });
    findPredicate.should.equal('hasBroader');
  });

  it('should render a read only input for each item in the result set', function test() {
    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        'relation-list-item': [
          {
            subject: {
              csid: '1111',
              number: 'Abe',
              refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Abe)\'Abe\'',
            },
          },
          {
            subject: {
              csid: '2222',
              number: 'Betty',
              refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Betty)\'Betty\'',
            },
          },
          {
            subject: {
              csid: '3333',
              number: 'Charles',
              refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Charles)\'Charles\'',
            },
          },
        ],
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchySiblingList
        findResult={findResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const inputs = findAllWithType(result, AutocompleteInputContainer);

    inputs.should.have.lengthOf(3);

    inputs.forEach((input, index) => {
      inputs[index].props.readOnly.should.equal(true);

      inputs[index].props.value.should.equal(findResult.getIn(
        ['ns2:relations-common-list', 'relation-list-item', index, 'subject', 'refName'])
      );
    });
  });

  it('should render one input for a single item (non-list) result set', function test() {
    const findResult = Immutable.fromJS({
      'ns2:relations-common-list': {
        'relation-list-item': {
          subject: {
            csid: '1111',
            number: 'Abe',
            refName: 'urn:cspace:core.collectionspace.org:personauthorities:name(person):item:name(Abe)\'Abe\'',
          },
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <HierarchySiblingList
        findResult={findResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const inputs = findAllWithType(result, AutocompleteInputContainer);

    inputs.should.have.lengthOf(1);

    inputs[0].props.readOnly.should.equal(true);

    inputs[0].props.value.should.equal(findResult.getIn(
      ['ns2:relations-common-list', 'relation-list-item', 'subject', 'refName'])
    );
  });
});
