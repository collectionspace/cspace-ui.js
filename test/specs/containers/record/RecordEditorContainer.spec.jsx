/* global window */

import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import RecordEditor from '../../../../src/components/record/RecordEditor';
import RecordEditorContainer from '../../../../src/containers/record/RecordEditorContainer';

import {
  STATUS_PENDING,
} from '../../../../src/constants/notificationStatusCodes';

import {
  REMOVE_NOTIFICATION,
  SHOW_NOTIFICATION,
  CLOSE_MODAL,
  OPEN_MODAL,
  NOTIFICATION_ID_VALIDATION,
} from '../../../../src/actions/notification';

import {
  CREATE_NEW_RECORD,
  RECORD_READ_STARTED,
  RECORD_SAVE_STARTED,
  RECORD_TRANSITION_STARTED,
  REVERT_RECORD,
  VALIDATION_PASSED,
} from '../../../../src/actions/record';

import {
  SET_FORM,
} from '../../../../src/actions/prefs';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('RecordEditorContainer', function suite() {
  const csid = '1234';
  const cloneCsid = '9999';
  const recordType = 'collectionobject';
  const data = Immutable.Map();

  const recordTypeConfig = {
    serviceConfig: {
      servicePath: 'collectionobjects',
    },
    fields: {},
    title: () => '',
  };

  const config = {
    recordTypes: {
      [recordType]: recordTypeConfig,
    },
  };

  const store = mockStore({
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
  });

  const context = {
    store,
  };

  afterEach(() => {
    store.clearActions();
  });

  it('should set props on RecordEditor', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(RecordEditor);
    result.props.should.have.property('data', data);
    result.props.should.have.property('isModified', true);
    result.props.should.have.property('createNewRecord').that.is.a('function');
    result.props.should.have.property('readRecord').that.is.a('function');
  });

  it('should connect createNewRecord to createNewRecord action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.createNewRecord(cloneCsid);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const action = store.getActions()[0];

        action.should.have.property('type', CREATE_NEW_RECORD);
        action.should.have.deep.property('meta.recordTypeConfig', recordTypeConfig);
        action.should.have.deep.property('meta.cloneCsid', cloneCsid);

        resolve();
      }, 0);
    });
  });

  it('should connect readRecord to readRecord action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid="abcd"
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    // The call to readRecord will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the readRecord action creator gets called, and
    // dispatches RECORD_READ_STARTED.

    try {
      result.props.readRecord();
    } catch (error) {
      const action = store.getActions()[0];

      action.should.have.property('type', RECORD_READ_STARTED);
      action.should.have.deep.property('meta.recordTypeConfig', recordTypeConfig);
      action.should.have.deep.property('meta.csid', 'abcd');
    }
  });

  it('should connect revert to revertRecord action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.revert();

    const action = store.getActions()[0];

    action.should.have.property('type', REVERT_RECORD);
    action.should.have.deep.property('meta.csid', csid);
  });

  it('should connect save to saveRecord action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    // The call to save will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the saveRecord action creator gets called, and
    // dispatches RECORD_SAVE_STARTED.

    try {
      result.props.save();
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

  it('should connect closeModal to closeModal action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.closeModal();

    const action = store.getActions()[0];

    action.should.have.property('type', CLOSE_MODAL);
  });

  it('should connect removeValidationNotification to removeValidationNotification action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.removeValidationNotification();

    const action = store.getActions()[0];

    action.type.should.equal = REMOVE_NOTIFICATION;
    action.meta.should.have.property('notificationID', NOTIFICATION_ID_VALIDATION);
  });

  it('should connect validateRecordData to validateRecordData action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.validateRecordData();

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

  it('should connect transitionRecord to transitionRecord action creator', function test() {
    const transitionName = 'transitionName';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    // The call to transitionRecord will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the transitionRecord action creator gets called, and
    // dispatches RECORD_TRANSITION_STARTED.

    try {
      result.props.transitionRecord(transitionName);
    } catch (error) {
      const action = store.getActions()[0];

      action.type.should.equal = RECORD_TRANSITION_STARTED;

      action.meta.should.have.property('csid', csid);
      action.meta.should.have.property('transitionName').that.equals(transitionName);
    }
  });

  it('should connect openModal to openModal action creator', function test() {
    const modalName = 'modalName';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.openModal(modalName);

    const action = store.getActions()[0];

    action.type.should.equal = OPEN_MODAL;

    action.meta.should.have.property('name').that.equals(modalName);
  });

  it('should connect setForm to setForm action creator', function test() {
    const formName = 'formName';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordEditorContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.setForm(formName);

    const action = store.getActions()[0];

    action.type.should.equal = SET_FORM;

    action.should.have.property('payload').that.equals(formName);
    action.meta.should.have.property('recordType').that.equals(recordType);
  });
});
