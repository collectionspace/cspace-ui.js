import React from 'react';
import { render } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import { findAllWithType } from 'react-shallow-testutils';
import createTestContainer from '../../../helpers/createTestContainer';
import HierarchySiblingList from '../../../../src/components/record/HierarchySiblingList';

chai.should();

const config = {
  recordTypes: {
    person: {
      name: 'person',
      serviceConfig: {
        servicePath: 'personauthorities',
        serviceType: 'authority',
      },
      vocabularies: {
        local: {
          serviceConfig: {
            servicePath: 'urn:cspace:name(person)',
          },
        },
      },
    },
  },
};

describe('HierarchySiblingList', () => {
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
      />, this.container,
    );

    this.container.querySelector('header').textContent.should.equal(title);
  });

  it('should render a header with the supplied title', function test() {
    const title = 'Siblings';

    render(
      <HierarchySiblingList
        title={title}
      />, this.container,
    );

    this.container.querySelector('header').textContent.should.equal(title);
  });

  it('should call findRelations when mounted', function test() {
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
      />, this.container,
    );

    findConfig.should.equal(config);
    findSubject.should.deep.equal({ recordType });
    findObject.should.deep.equal({ csid: parentCsid, recordType });
    findPredicate.should.equal('hasBroader');
  });

  it('should call findRelations when parentCsid is changed', function test() {
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
      />, this.container,
    );

    const newParentCsid = '2222';

    render(
      <HierarchySiblingList
        config={config}
        parentCsid={newParentCsid}
        recordType={recordType}
        findRelations={findRelations}
      />, this.container,
    );

    findConfig.should.equal(config);
    findSubject.should.deep.equal({ recordType });
    findObject.should.deep.equal({ csid: newParentCsid, recordType });
    findPredicate.should.equal('hasBroader');
  });

  it('should render a link for each item in the result set', () => {
    const findResult = Immutable.fromJS({
      'rel:relations-common-list': {
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
        config={config}
        findResult={findResult}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const inputs = findAllWithType(result, Link);

    inputs.should.have.lengthOf(3);
  });

  it('should render one input for a single item (non-list) result set', () => {
    const findResult = Immutable.fromJS({
      'rel:relations-common-list': {
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
        config={config}
        findResult={findResult}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const inputs = findAllWithType(result, Link);

    inputs.should.have.lengthOf(1);
  });
});
