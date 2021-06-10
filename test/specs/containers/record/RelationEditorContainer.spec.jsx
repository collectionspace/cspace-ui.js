import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import RelationEditor from '../../../../src/components/record/RelationEditor';
import RelationEditorContainer from '../../../../src/containers/record/RelationEditorContainer';

import {
  CLEAR_RELATION_STATE,
  RELATION_FIND_STARTED,
  RELATION_SAVE_STARTED,
} from '../../../../src/constants/actionCodes';
import { findWithType } from 'react-shallow-testutils';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('RelationEditorContainer', () => {
  const subject = {
    csid: '1234',
    recordType: 'collectionobject',
  };

  const object = {
    csid: '5678',
    recordType: 'group',
  };

  const predicate = 'affects';

  const findResult = Immutable.fromJS({
    'rel:relations-common-list': {
      totalItems: '1',
    },
  });

  const store = mockStore({
    notification: Immutable.Map(),
    relation: Immutable.fromJS({
      find: {
        [subject.csid]: {
          [object.csid]: {
            [predicate]: {
              result: findResult,
            },
          },
        },
      },
    }),
    record: Immutable.Map(),
  });

  const context = {
    store,
  };

  const config = {
  };

  afterEach(() => {
    store.clearActions();
  });

  it('should set props on RelationEditor', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditorContainer
        store={store}
        subject={subject}
        object={object}
        predicate={predicate}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RelationEditor);

    editor.should.not.be.null;
    editor.props.should.have.property('findResult').that.equals(findResult);
    editor.props.should.have.property('createRelation').that.is.a('function');
    editor.props.should.have.property('findRelation').that.is.a('function');
    editor.props.should.have.property('onUnmount').that.is.a('function');
  });

  it('should connect createRelation to createBidirectional action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditorContainer
        store={store}
        subject={subject}
        object={object}
        predicate={predicate}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RelationEditor);

    // The call to createRelation will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the readRecord createBidirectional creator gets called,
    // and dispatches RELATION_SAVE_STARTED.

    try {
      editor.props.createRelation(subject, object, predicate);
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', RELATION_SAVE_STARTED);
      action.should.have.deep.property('meta.subject', subject);
      action.should.have.deep.property('meta.object', object);
      action.should.have.deep.property('meta.predicate', predicate);
    }
  });

  it('should connect findRelation to find action creator', () => {
    const newObject = {
      csid: '8888',
      recordType: 'group',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditorContainer
        store={store}
        subject={subject}
        object={newObject}
        predicate={predicate}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RelationEditor);

    // The call to findRelation will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the find action creator gets called, and
    // dispatches RELATION_FIND_STARTED.

    try {
      editor.props.findRelation(config, subject, newObject, predicate);
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', RELATION_FIND_STARTED);
      action.should.have.deep.property('meta.subject', subject);
      action.should.have.deep.property('meta.object', newObject);
      action.should.have.deep.property('meta.predicate', predicate);
    }
  });

  it('should connect onUnmount to clearState action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RelationEditorContainer
        store={store}
        subject={subject}
        object={object}
        predicate={predicate}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RelationEditor);

    editor.props.onUnmount();

    const action = store.getActions()[0];

    action.should.have.property('type', CLEAR_RELATION_STATE);
  });
});
