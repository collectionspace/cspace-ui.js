/* global window */

import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import chaiAsPromised from 'chai-as-promised';
import Immutable from 'immutable';
import { setupWorker, rest } from 'msw';
import thunk from 'redux-thunk';
import { findWithType } from 'react-shallow-testutils';
import RecordEditor from '../../../../src/components/record/RecordEditor';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';

import {
  REMOVE_NOTIFICATION,
  SHOW_NOTIFICATION,
  CLOSE_MODAL,
  OPEN_MODAL,
  CREATE_NEW_RECORD,
  RECORD_DELETE_STARTED,
  RECORD_READ_STARTED,
  RECORD_SAVE_STARTED,
  RECORD_TRANSITION_STARTED,
  REVERT_RECORD,
  VALIDATION_PASSED,
  SET_FORM,
} from '../../../../src/constants/actionCodes';

import {
  STATUS_PENDING,
} from '../../../../src/constants/notificationStatusCodes';

import {
  configureCSpace,
} from '../../../../src/actions/cspace';

import {
  NOTIFICATION_ID_VALIDATION,
} from '../../../../src/actions/notification';

chai.use(chaiAsPromised);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('RecordEditorContainer', () => {
  const worker = setupWorker();

  const csid = '1234';
  const cloneCsid = '9999';
  const recordType = 'collectionobject';
  const authRecordType = 'person';
  const vocabulary = 'ulan';
  const data = Immutable.Map();
  const reportRecordType = 'report';

  const recordTypeConfig = {
    serviceConfig: {
      servicePath: 'collectionobjects',
    },
    fields: {},
    title: () => '',
  };

  const vocabularyConfig = {
    serviceConfig: {
      servicePath: 'urn:cspace:name(ulan)',
    },
  };

  const reportConfig = {
    serviceConfig: {
      servicePath: 'reports',
    },
    fields: {},
    title: () => '',
  };

  const authRecordTypeConfig = {
    serviceConfig: {
      servicePath: 'personauthorities',
    },
    fields: {},
    title: () => '',
    vocabularies: {
      [vocabulary]: vocabularyConfig,
    },
  };

  const config = {
    recordTypes: {
      [recordType]: recordTypeConfig,
      [authRecordType]: authRecordTypeConfig,
      [reportRecordType]: reportConfig,
    },
  };

  const store = mockStore({
    authority: Immutable.Map(),
    notification: Immutable.Map(),
    prefs: Immutable.Map(),
    record: Immutable.fromJS({
      [csid]: {
        data: {
          baseline: Immutable.Map({ foo: 'bar' }),
          current: data,
        },
      },
      [cloneCsid]: {
        data: {
          current: Immutable.Map({ bar: 'baz' }),
        },
      },
    }),
    idGenerator: Immutable.fromJS({
      accession: {
        csid: '9dd92952-c384-44dc-a736-95e435c1759c',
        messages: {
          type: {
            id: 'idGenerator.accession.type',
            defaultMessage: 'Accession',
          },
        },
        sample: '2016.1.23',
      },
    }),
    user: Immutable.Map(),
  });

  const context = {
    store,
  };

  before(() => {
    worker.start({ quiet: true });

    return store.dispatch(configureCSpace())
      .then(() => store.clearActions());
  });

  afterEach(() => {
    store.clearActions();
    worker.resetHandlers();
  });

  after(() => {
    worker.stop();
  });

  it('should set props on RecordEditor', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    editor.should.not.be.null;
    editor.props.should.have.property('data', data);
    editor.props.should.have.property('isModified', true);
    editor.props.should.have.property('createNewRecord').that.is.a('function');
    editor.props.should.have.property('deleteRecord').that.is.a('function');
    editor.props.should.have.property('readRecord').that.is.a('function');
    editor.props.should.have.property('removeNotification').that.is.a('function');
    editor.props.should.have.property('checkForRelations').that.is.a('function');
    editor.props.should.have.property('checkForUses').that.is.a('function');
    editor.props.should.have.property('checkForRoleUses').that.is.a('function');
  });

  it('should connect createNewRecord to createNewRecord action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={authRecordType}
        vocabulary={vocabulary}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    editor.props.createNewRecord(cloneCsid);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const action = store.getActions()[0];

        action.should.have.property('type', CREATE_NEW_RECORD);
        action.should.have.deep.property('meta.recordTypeConfig', authRecordTypeConfig);
        action.should.have.deep.property('meta.cloneCsid', cloneCsid);

        resolve();
      }, 0);
    });
  });

  it('should connect deleteRecord to deleteRecord action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid="abcd"
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    // The call to deleteRecord will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the deleteRecord action creator gets called, and
    // dispatches RECORD_DELETE_STARTED.

    try {
      editor.props.deleteRecord();
    } catch (error) {
      const actions = store.getActions();

      actions[0].should.have.property('type', SHOW_NOTIFICATION);

      actions[1].should.have.property('type', RECORD_DELETE_STARTED);
      actions[1].should.have.deep.property('meta.recordTypeConfig', recordTypeConfig);
      actions[1].should.have.deep.property('meta.csid', 'abcd');
    }
  });

  it('should connect readRecord to readRecord action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid="abcd"
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    // The call to readRecord will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the readRecord action creator gets called, and
    // dispatches RECORD_READ_STARTED.

    try {
      editor.props.readRecord();
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', RECORD_READ_STARTED);
      action.should.have.deep.property('meta.recordTypeConfig', recordTypeConfig);
      action.should.have.deep.property('meta.csid', 'abcd');
    }
  });

  it('should connect revert to revertRecord action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    editor.props.revert();

    const action = store.getActions()[0];

    action.should.have.property('type', REVERT_RECORD);
    action.should.have.deep.property('meta.csid', csid);
  });

  it('should connect save to saveRecord action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    // The call to save will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the saveRecord action creator gets called, and
    // dispatches RECORD_SAVE_STARTED.

    try {
      editor.props.save();
    } catch (error) {
      const actions = store.getActions();

      actions[0].should.have.property('type', VALIDATION_PASSED);

      actions[1].should.have.property('type', REMOVE_NOTIFICATION);

      actions[2].should.have.property('type', SHOW_NOTIFICATION);
      actions[2].should.have.deep.property('payload.status', STATUS_PENDING);

      actions[3].should.have.property('type', RECORD_SAVE_STARTED);
      actions[3].should.have.deep.property('meta.recordTypeConfig', recordTypeConfig);
      actions[3].should.have.deep.property('meta.csid', csid);
    }
  });

  it('should connect saveWithTransition to saveRecordWithTransition action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    // The call to saveWithTransition will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the saveRecordWithTransition action creator gets called,
    // and dispatches RECORD_SAVE_STARTED.

    // TODO: Should verify that RECORD_TRANSITION_STARTED is dispatched, but this requires fully
    // stubbing out the save.

    try {
      editor.props.saveWithTransition();
    } catch (error) {
      const actions = store.getActions();

      actions[0].should.have.property('type', VALIDATION_PASSED);

      actions[1].should.have.property('type', REMOVE_NOTIFICATION);

      actions[2].should.have.property('type', SHOW_NOTIFICATION);
      actions[2].should.have.deep.property('payload.status', STATUS_PENDING);

      actions[3].should.have.property('type', RECORD_SAVE_STARTED);
      actions[3].should.have.deep.property('meta.recordTypeConfig', recordTypeConfig);
      actions[3].should.have.deep.property('meta.csid', csid);
    }
  });

  it('should connect closeModal to closeModal action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    editor.props.closeModal();

    const action = store.getActions()[0];

    action.should.have.property('type', CLOSE_MODAL);
  });

  it('should connect removeNotification to removeNotification action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);
    const notificationID = 'foo';

    editor.props.removeNotification(notificationID);

    const action = store.getActions()[0];

    action.type.should.equal = REMOVE_NOTIFICATION;
    action.meta.should.have.property('notificationID', notificationID);
  });

  it('should connect removeValidationNotification to removeValidationNotification action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    editor.props.removeValidationNotification();

    const action = store.getActions()[0];

    action.type.should.equal = REMOVE_NOTIFICATION;
    action.meta.should.have.property('notificationID', NOTIFICATION_ID_VALIDATION);
  });

  it('should connect validateRecordData to validateRecordData action creator', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    editor.props.validateRecordData();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const action = store.getActions()[0];

        action.type.should.equal = VALIDATION_PASSED;

        action.meta.should.have.property('csid', csid);
        action.meta.should.have.property('path').that.deep.equals([]);

        resolve();
      }, 0);
    });
  });

  it('should connect transitionRecord to transitionRecord action creator', () => {
    const transitionName = 'transitionName';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    // The call to transitionRecord will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the transitionRecord action creator gets called, and
    // dispatches RECORD_TRANSITION_STARTED.

    try {
      editor.props.transitionRecord(transitionName);
    } catch (error) {
      const action = store.getActions()[0];

      action.type.should.equal = RECORD_TRANSITION_STARTED;

      action.meta.should.have.property('csid', csid);
      action.meta.should.have.property('transitionName').that.equals(transitionName);
    }
  });

  it('should connect openModal to openModal action creator', () => {
    const modalName = 'modalName';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    editor.props.openModal(modalName);

    const action = store.getActions()[0];

    action.type.should.equal = OPEN_MODAL;

    action.meta.should.have.property('name').that.equals(modalName);
  });

  it('should connect setForm to setForm action creator', () => {
    const formName = 'formName';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    editor.props.setForm(formName);

    const action = store.getActions()[0];

    action.type.should.equal = SET_FORM;

    action.should.have.property('payload').that.equals(formName);
    action.meta.should.have.property('recordType').that.equals(recordType);
  });

  it('should connect checkForRelations to checkForRelations action creator', () => {
    const predicate = 'affects';

    worker.use(
      rest.get('/cspace-services/relations', async (req, res, ctx) => {
        const { searchParams } = req.url;

        if (
          searchParams.get('prd') === predicate
          && searchParams.get('sbj') === csid
        ) {
          return res(ctx.status(200));
        }

        return res(ctx.status(400));
      }),
    );

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={recordType}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    return result.props.checkForRelations(predicate).should.eventually.be.fulfilled;
  });

  it('should connect checkForUses to checkForUses action creator', () => {
    const refObjsUrl = `/cspace-services/personauthorities/:vocabulary/items/${csid}/refObjs`;

    worker.use(
      rest.get(refObjsUrl, async (req, res, ctx) => {
        const { params } = req;

        if (params.vocabulary === `urn:cspace:name(${vocabulary})`) {
          return res(ctx.status(200));
        }

        return res(ctx.status(400));
      }),
    );

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType={authRecordType}
        vocabulary={vocabulary}
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    return result.props.checkForUses().should.eventually.be.fulfilled;
  });

  it('should connect checkForRoleUses to checkForRoleUses action creator', () => {
    const accountRolesUrl = `/cspace-services/authorization/roles/${csid}/accountroles`;

    worker.use(
      rest.get(accountRolesUrl, async (req, res, ctx) => res(ctx.status(200))),
    );

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        store={store}
        config={config}
        csid={csid}
        recordType="authrole"
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();
    const editor = findWithType(result, RecordEditor);

    return result.props.checkForRoleUses().should.eventually.be.fulfilled;
  });
});
