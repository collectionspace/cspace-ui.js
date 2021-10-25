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
} from '../../../../src/constants/actionCodes';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore([thunk]);

const paramData = Immutable.Map();

const store = mockStore({
  prefs: Immutable.Map(),
  record: Immutable.fromJS({
    '': {
      data: {
        baseline: paramData,
        current: paramData,
      },
    },
  }),
  user: Immutable.Map(),
});

const context = {
  store,
};

describe('InvocationEditorContainer', () => {
  before(() => store.dispatch(configureCSpace())
    .then(() => store.clearActions()));

  afterEach(() => {
    store.clearActions();
  });

  it('should set props on InvocationEditor', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditorContainer />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(InvocationEditor);
    result.props.should.have.property('paramData', paramData);
    result.props.should.have.property('createNewRecord').that.is.a('function');
  });

  it('should connect createNewRecord to createNewRecord action creator', () => {
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
      recordTypes: {
        report: {
          invocableName: (data) => data.getIn(['document', 'ns2:reports_common', 'filename']),
        },
      },
    };

    const metadata = Immutable.fromJS({
      document: {
        'ns2:reports_common': {
          filename: reportName,
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditorContainer
        config={config}
        metadata={metadata}
        recordType="report"
      />, context,
    );

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

  it('should connect createNewRecord to a no-op if there is no field config for the invocable', () => {
    const reportName = 'testReport';

    const config = {
      invocables: {
        report: {},
      },
      recordTypes: {
        report: {
          invocableName: (data) => data.getIn(['document', 'ns2:reports_common', 'filename']),
        },
      },
    };

    const metadata = Immutable.fromJS({
      document: {
        'ns2:reports_common': {
          filename: reportName,
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationEditorContainer
        config={config}
        metadata={metadata}
        recordType="report"
      />, context,
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result.props.createNewRecord()).to.equal(undefined);
  });
});
