import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import RecordForm from '../../../../src/components/record/RecordForm';
import RecordFormContainer from '../../../../src/containers/record/RecordFormContainer';

import {
  ADD_FIELD_INSTANCE,
  DELETE_FIELD_VALUE,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  SORT_FIELD_INSTANCES,
} from '../../../../src/actions/record';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('RecordFormContainer', function suite() {
  const csid = '1234';
  const recordType = 'collectionobject';
  const path = ['comments', 'comment'];

  const recordTypeConfig = {
    serviceConfig: {
      servicePath: 'collectionobjects',
    },
  };

  const config = {
    recordTypes: {
      [recordType]: recordTypeConfig,
    },
  };

  const store = mockStore({
    record: Immutable.Map(),
  });

  const context = {
    store,
  };

  afterEach(() => {
    store.clearActions();
  });

  it('should set props on RecordForm', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordFormContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(RecordForm);
    result.props.should.have.property('onAddInstance').that.is.a('function');
    result.props.should.have.property('onCommit').that.is.a('function');
    result.props.should.have.property('onMoveInstance').that.is.a('function');
    result.props.should.have.property('onRemoveInstance').that.is.a('function');
    result.props.should.have.property('onSortInstances').that.is.a('function');
  });

  it('should connect onAddInstance to addFieldInstance action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordFormContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onAddInstance(path);

    const action = store.getActions()[0];

    action.should.have.property('type', ADD_FIELD_INSTANCE);
    action.should.have.deep.property('meta.csid', csid);
    action.should.have.deep.property('meta.path', path);
    action.should.have.deep.property('meta.recordTypeConfig', recordTypeConfig);
  });

  it('should connect onCommit to setFieldValue action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordFormContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onCommit(path, 'value');

    const action = store.getActions()[0];

    action.should.have.property('type', SET_FIELD_VALUE);
    action.should.have.property('payload', 'value');
    action.should.have.deep.property('meta.csid', csid);
    action.should.have.deep.property('meta.path', path);
  });

  it('should connect onMoveInstance to moveFieldValue action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordFormContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onMoveInstance(path, '0');

    const action = store.getActions()[0];

    action.should.have.property('type', MOVE_FIELD_VALUE);
    action.should.have.deep.property('meta.csid', csid);
    action.should.have.deep.property('meta.path', path);
    action.should.have.deep.property('meta.newPosition', '0');
  });

  it('should connect onRemoveInstance to deleteFieldValue action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordFormContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onRemoveInstance(path, '0');

    const action = store.getActions()[0];

    action.should.have.property('type', DELETE_FIELD_VALUE);
    action.should.have.deep.property('meta.csid', csid);
    action.should.have.deep.property('meta.path', path);
  });

  it('should connect onSortInstances to sortInstances action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <RecordFormContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.onSortInstances(path, 'byField');

    const action = store.getActions()[0];

    action.should.have.property('type', SORT_FIELD_INSTANCES);
    action.should.have.deep.property('meta.csid', csid);
    action.should.have.deep.property('meta.path', path);
    action.should.have.deep.property('meta.byField', 'byField');
  });
});
