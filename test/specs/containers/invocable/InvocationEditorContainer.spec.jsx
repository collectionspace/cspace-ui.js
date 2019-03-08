import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import InvocationEditor from '../../../../src/components/invocable/InvocationEditor';
import InvocationEditorContainer from '../../../../src/containers/invocable/InvocationEditorContainer';

import {
  configureCSpace,
} from '../../../../src/actions/cspace';

import {
  CREATE_NEW_RECORD,
} from '../../../../src/actions/record';

const mockStore = configureMockStore([thunk]);

const data = Immutable.Map();

const store = mockStore({
  prefs: Immutable.Map(),
  record: Immutable.fromJS({
    '': {
      data: {
        baseline: data,
        current: data,
      },
    },
  }),
});

const context = {
  store,
};

describe('InvocationEditorContainer', function suite() {
  before(() =>
    store.dispatch(configureCSpace())
      .then(() => store.clearActions())
  );

  afterEach(() => {
    store.clearActions();
  });

  it('should set props on InvocationEditor', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditorContainer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(InvocationEditor);
    result.props.should.have.property('data', data);
    result.props.should.have.property('createNewRecord').that.is.a('function');
  });

  it('should connect createNewRecord to createNewRecord action creator', function test() {
    const reportName = 'testReport';

    const reportRecordTypeConfig = {
      fields: {},
    };

    const config = {
      invocables: {
        report: {
          [reportName]: reportRecordTypeConfig,
        },
      },
    };

    const invocationItem = Immutable.Map({
      filename: `${reportName}.jrxml`,
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditorContainer
        config={config}
        invocationItem={invocationItem}
        type="report"
      />, context);

    const result = shallowRenderer.getRenderOutput();

    return result.props.createNewRecord()
      .then(() => {
        const action = store.getActions()[0];
        action.should.have.property('type', CREATE_NEW_RECORD);
        action.should.have.deep.property('meta.recordTypeConfig', reportRecordTypeConfig);
      })
      .catch((err) => {
        throw err;
      });
  });
});
