import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findAllWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import { Modal } from 'cspace-layout';
import SavedQueriesModal from '../../../../src/components/search/SavedQueriesModal';

const { MiniButton } = inputComponents;

chai.should();

const intl = {
  formatDate: () => null,
  formatTime: () => null,
  formatRelative: () => null,
  formatNumber: () => null,
  formatPlural: () => null,
  formatMessage: (message) => `formatted ${message.id}`,
  formatHTMLMessage: () => null,
  now: () => null,
};

const config = {
  recordTypes: {
    collectionobject: {
      messages: {
        record: {
          collectionName: {
            id: 'record.collectionobject.collectionName',
            defaultMessage: 'Objects',
          },
        },
      },
    },
  },
};

const savedQueries = Immutable.fromJS([
  {
    id: '1234',
    name: 'my query',
    description: 'a description',
    recordType: 'collectionobject',
  },
  {
    id: '5678',
    name: 'old query',
    recordType: 'obsoleteRecordType',
  },
]);

const findButtons = (result, name) => findAllWithType(result, MiniButton)
  .filter((button) => button.props.name === name);

describe('SavedQueriesModal', () => {
  it('should render a Modal containing a row for each saved query', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SavedQueriesModal config={config} savedQueries={savedQueries} />, { intl },
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Modal);

    findButtons(result, 'loadQuery').should.have.lengthOf(2);
    findButtons(result, 'deleteQuery').should.have.lengthOf(2);
  });

  it('should call onLoadQuery when a load button is clicked', () => {
    let loadedQuery = null;

    const handleLoadQuery = (queryArg) => {
      loadedQuery = queryArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SavedQueriesModal
        config={config}
        savedQueries={savedQueries}
        onLoadQuery={handleLoadQuery}
      />, { intl },
    );

    const result = shallowRenderer.getRenderOutput();

    findButtons(result, 'loadQuery')[0].props.onClick();

    loadedQuery.should.equal(savedQueries.get(0));
  });

  it('should call deleteQuery when a delete button is clicked and confirmed', () => {
    let deletedId = null;

    const deleteQuery = (idArg) => {
      deletedId = idArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SavedQueriesModal
        config={config}
        savedQueries={savedQueries}
        deleteQuery={deleteQuery}
      />, { intl },
    );

    let result = shallowRenderer.getRenderOutput();

    findButtons(result, 'deleteQuery')[0].props.onClick();

    result = shallowRenderer.getRenderOutput();

    const confirmButtons = findButtons(result, 'confirmDeleteQuery');

    confirmButtons.should.have.lengthOf(1);

    confirmButtons[0].props.onClick();

    deletedId.should.equal('1234');
  });

  it('should cancel a pending delete when the cancel button is clicked', () => {
    let deleteQueryCalled = false;

    const deleteQuery = () => {
      deleteQueryCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SavedQueriesModal
        config={config}
        savedQueries={savedQueries}
        deleteQuery={deleteQuery}
      />, { intl },
    );

    let result = shallowRenderer.getRenderOutput();

    findButtons(result, 'deleteQuery')[0].props.onClick();

    result = shallowRenderer.getRenderOutput();

    findButtons(result, 'cancelDeleteQuery')[0].props.onClick();

    result = shallowRenderer.getRenderOutput();

    findButtons(result, 'confirmDeleteQuery').should.have.lengthOf(0);
    findButtons(result, 'deleteQuery').should.have.lengthOf(2);

    deleteQueryCalled.should.equal(false);
  });

  it('should render an empty message when there are no saved queries', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <SavedQueriesModal config={config} />, { intl },
    );

    const result = shallowRenderer.getRenderOutput();

    findAllWithType(result, MiniButton).should.have.lengthOf(0);
    findAllWithType(result, 'ul').should.have.lengthOf(0);
  });
});
