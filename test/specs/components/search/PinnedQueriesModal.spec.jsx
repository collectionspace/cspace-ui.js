import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findAllWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import { Modal } from 'cspace-layout';
import PinnedQueriesModal from '../../../../src/components/search/PinnedQueriesModal';

const { MiniButton } = inputComponents;

const { expect } = chai;

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

const pinnedQueries = Immutable.fromJS([
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

const fakeEvent = {
  stopPropagation: () => {},
};

const findButtons = (result, name) => findAllWithType(result, MiniButton)
  .filter((button) => button.props.name === name);

describe('PinnedQueriesModal', () => {
  it('should render a Modal containing a table with a row for each pinned query', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <PinnedQueriesModal config={config} pinnedQueries={pinnedQueries} />, { intl },
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(Modal);

    findAllWithType(result, 'table').should.have.lengthOf(1);

    // One header row, plus one row per pinned query.

    findAllWithType(result, 'tr').should.have.lengthOf(3);
  });

  it('should call onLoadQuery when a row is clicked', () => {
    let loadedQuery = null;

    const handleLoadQuery = (queryArg) => {
      loadedQuery = queryArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <PinnedQueriesModal
        config={config}
        pinnedQueries={pinnedQueries}
        onLoadQuery={handleLoadQuery}
      />, { intl },
    );

    const result = shallowRenderer.getRenderOutput();
    const rows = findAllWithType(result, 'tr');

    rows[1].props.onClick();

    loadedQuery.should.equal(pinnedQueries.get(0));
  });

  it('should call onLoadQuery when enter is pressed on a row', () => {
    let loadedQuery = null;

    const handleLoadQuery = (queryArg) => {
      loadedQuery = queryArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <PinnedQueriesModal
        config={config}
        pinnedQueries={pinnedQueries}
        onLoadQuery={handleLoadQuery}
      />, { intl },
    );

    const result = shallowRenderer.getRenderOutput();
    const rows = findAllWithType(result, 'tr');

    rows[1].props.onKeyDown({
      key: 'a',
      preventDefault: () => {},
    });

    expect(loadedQuery).to.equal(null);

    rows[1].props.onKeyDown({
      key: 'Enter',
      preventDefault: () => {},
    });

    loadedQuery.should.equal(pinnedQueries.get(0));
  });

  it('should call deleteQuery when a delete button is clicked and confirmed', () => {
    let deletedId = null;

    const deleteQuery = (idArg) => {
      deletedId = idArg;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <PinnedQueriesModal
        config={config}
        pinnedQueries={pinnedQueries}
        deleteQuery={deleteQuery}
      />, { intl },
    );

    let result = shallowRenderer.getRenderOutput();

    findButtons(result, 'deleteQuery')[0].props.onClick(fakeEvent);

    result = shallowRenderer.getRenderOutput();

    const confirmButtons = findButtons(result, 'confirmDeleteQuery');

    confirmButtons.should.have.lengthOf(1);

    confirmButtons[0].props.onClick(fakeEvent);

    deletedId.should.equal('1234');
  });

  it('should cancel a pending delete when the cancel button is clicked', () => {
    let deleteQueryCalled = false;

    const deleteQuery = () => {
      deleteQueryCalled = true;
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <PinnedQueriesModal
        config={config}
        pinnedQueries={pinnedQueries}
        deleteQuery={deleteQuery}
      />, { intl },
    );

    let result = shallowRenderer.getRenderOutput();

    findButtons(result, 'deleteQuery')[0].props.onClick(fakeEvent);

    result = shallowRenderer.getRenderOutput();

    findButtons(result, 'cancelDeleteQuery')[0].props.onClick(fakeEvent);

    result = shallowRenderer.getRenderOutput();

    findButtons(result, 'confirmDeleteQuery').should.have.lengthOf(0);
    findButtons(result, 'deleteQuery').should.have.lengthOf(2);

    deleteQueryCalled.should.equal(false);
  });

  it('should render an empty message instead of a table when there are no pinned queries', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <PinnedQueriesModal config={config} />, { intl },
    );

    const result = shallowRenderer.getRenderOutput();

    findAllWithType(result, 'table').should.have.lengthOf(0);
    findAllWithType(result, MiniButton).should.have.lengthOf(0);
  });
});
