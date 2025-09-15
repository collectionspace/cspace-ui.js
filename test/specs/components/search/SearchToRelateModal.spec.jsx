/* global window */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import { IntlProvider, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';
import { Modal } from 'cspace-layout';
import SearchToRelateModal from '../../../../src/components/search/SearchToRelateModal';
import SearchToSelectModalContainer from '../../../../src/containers/search/SearchToSelectModalContainer';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';

chai.use(chaiImmutable);
chai.should();

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
  recordTypes: {
    collectionobject: {
      name: 'collectionobject',
      messages: {
        record: {
          collectionName: {
            id: 'record.collectionobject.collectionName',
            defaultMessage: 'Objects',
          },
        },
      },
      serviceConfig: {
        servicePath: 'collectionobjects',
        serviceType: 'object',
      },
    },
  },
};

const perms = Immutable.fromJS({
  collectionobject: {
    data: 'CRUDL',
  },
  relation: {
    data: 'CRUDL',
  },
});

describe('SearchToRelateModal', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a SearchToSelectModal', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(SearchToSelectModalContainer);
  });

  it('should add mkRtSbj to the search descriptor when there is a single subject', () => {
    const subject = {
      csid: '1234',
      recordType: 'group',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal
        subjects={[subject]}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    const searchDescriptor = Immutable.fromJS({
      searchQuery: {
        kw: 'hello',
      },
    });

    result.props.customizeSearchDescriptor(searchDescriptor).should.equal(Immutable.fromJS({
      searchQuery: {
        kw: 'hello',
        mkRtSbj: '1234',
      },
    }));
  });

  it('should not modify the search descriptor when there are multiple subjects', () => {
    const subjects = [
      {
        csid: '1234',
        recordType: 'group',
      },
      {
        csid: '5678',
        recordType: 'group',
      },
    ];

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal
        subjects={subjects}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    const searchDescriptor = Immutable.fromJS({
      searchQuery: {
        kw: 'hello',
      },
    });

    result.props.customizeSearchDescriptor(searchDescriptor).should.equal(searchDescriptor);
  });

  it('should render a relating message when the selection has been accepted', function test() {
    const subject = {
      csid: '1234',
      recordType: 'group',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal
        subjects={[subject]}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const message = result.props.renderAcceptPending();

    render(
      <IntlProvider locale="en">
        {message}
      </IntlProvider>, this.container,
    );

    this.container.textContent.should.contain('Relating');
  });

  it('should call createRelations followed by onRelationsCreated when the selection is accepted', () => {
    const recordType = 'collectionobject';

    const subjects = [{
      csid: '1234',
      recordType: 'group',
    }];

    let createdSubjects = null;
    let createdObjects = null;
    let createdPredicate = null;

    const createRelations = (subjectsArg, objectsArg, predicateArg) => {
      createdSubjects = subjectsArg;
      createdObjects = objectsArg;
      createdPredicate = predicateArg;

      return Promise.resolve();
    };

    let createdHandlerCalled = false;

    const handleRelationsCreated = () => {
      createdHandlerCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal
        subjects={subjects}
        createRelations={createRelations}
        onRelationsCreated={handleRelationsCreated}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    const selectedItems = Immutable.fromJS({
      1111: { recordType, csid: '1111' },
      2222: { recordType, csid: '2222' },
    });

    result.props.onAccept(selectedItems, Immutable.Map({ recordType }));

    createdSubjects.should.deep.equal(subjects);

    createdObjects.should.deep.equal([
      { recordType, csid: '1111' },
      { recordType, csid: '2222' },
    ]);

    createdPredicate.should.equal('affects');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        createdHandlerCalled.should.equal(true);

        resolve();
      }, 0);
    });
  });

  it('should do nothing when the selection is accepted if there are no subjects', () => {
    const recordType = 'collectionobject';

    let created = false;

    const createRelations = () => {
      created = true;

      return Promise.resolve();
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal
        createRelations={createRelations}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    const selectedItems = Immutable.fromJS({
      1111: { recordType, csid: '1111' },
      2222: { recordType, csid: '2222' },
    });

    result.props.onAccept(selectedItems, Immutable.Map({ recordType }));

    created.should.equal(false);
  });

  it('should call showRelationNotification if multiple subjects are successfully related', () => {
    const recordType = 'collectionobject';

    const subjects = [
      {
        csid: '1234',
        recordType: 'group',
      },
      {
        csid: '5678',
        recordType: 'group',
      },
    ];

    const createRelations = () => Promise.resolve();

    let notificationValues = null;

    const showRelationNotification = (messageArg, valuesArg) => {
      notificationValues = valuesArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal
        subjects={subjects}
        createRelations={createRelations}
        showRelationNotification={showRelationNotification}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    const selectedItems = Immutable.fromJS({
      1111: { recordType, csid: '1111' },
      2222: { recordType, csid: '2222' },
    });

    result.props.onAccept(selectedItems, Immutable.Map({ recordType }));

    return new Promise((resolve) => {
      window.setTimeout(() => {
        notificationValues.should.deep.equal({
          subjectCount: 2,
          objectCount: 2,
        });

        resolve();
      }, 0);
    });
  });

  it('should call subjects to retrieve subjects if it is a function', () => {
    const recordType = 'collectionobject';

    const subjects = [{
      csid: '1234',
      recordType: 'group',
    }];

    const getSubjects = () => subjects;

    let createdSubjects = null;

    const createRelations = (subjectsArg) => {
      createdSubjects = subjectsArg;

      return Promise.resolve();
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal
        subjects={getSubjects}
        createRelations={createRelations}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    const selectedItems = Immutable.fromJS({
      1111: { recordType, csid: '1111' },
      2222: { recordType, csid: '2222' },
    });

    result.props.onAccept(selectedItems, Immutable.Map({ recordType }));

    createdSubjects.should.deep.equal(subjects);
  });

  it('should not show a checkbox on items that are locked, already related to, or the same as the subject', () => {
    const subject = {
      csid: '1234',
      recordType: 'group',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal
        subjects={[subject]}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const { shouldShowCheckbox } = result.props;

    shouldShowCheckbox(Immutable.Map({
      workflowState: 'locked',
    })).should.equal(false);

    shouldShowCheckbox(Immutable.Map({
      related: 'true',
    })).should.equal(false);

    shouldShowCheckbox(Immutable.Map({
      csid: '1234',
    })).should.equal(false);
  });

  it('should show a checkbox on items that the user has permission to relate', () => {
    const subject = {
      csid: '1234',
      recordType: 'group',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal
        config={config}
        perms={perms}
        subjects={[subject]}
      />,
    );

    const result = shallowRenderer.getRenderOutput();
    const { shouldShowCheckbox } = result.props;

    shouldShowCheckbox(Immutable.Map({
      uri: '/collectionobjects/abcd',
    })).should.equal(true);
  });

  it('should render a Modal containing an error message when an error is supplied', () => {
    const error = {
      code: 'locked',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SearchToRelateModal
        isOpen
        error={error}
      />,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Modal);

    const message = findWithType(result, FormattedMessage);

    message.props.defaultMessage.should.contain('Locked records are selected');
  });
});
