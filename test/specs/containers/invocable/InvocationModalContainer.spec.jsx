import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import InvocationModal from '../../../../src/components/invocable/InvocationModal';
import InvocationModalContainer from '../../../../src/containers/invocable/InvocationModalContainer';

import {
  configureCSpace,
} from '../../../../src/actions/cspace';

const mockStore = configureMockStore([thunk]);

const data = Immutable.fromJS({
  document: {
    'ns2:reports_common': {
      filename: 'report.jrxml',
    },
  },
});

const store = mockStore({
  record: Immutable.fromJS({
    1234: {
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

const config = {
  recordTypes: {
    report: {},
  },
};

describe('InvocationModalContainer', function suite() {
  before(() =>
    store.dispatch(configureCSpace())
      .then(() => store.clearActions())
  );

  afterEach(() => {
    store.clearActions();
  });

  it('should set props on InvocationModal', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationModalContainer
        config={config}
        csid="1234"
        recordType="report"
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(InvocationModal);
    result.props.should.have.property('data', data);
    result.props.should.have.property('readRecord').that.is.a('function');
  });

  it('should connect readRecord to readRecord action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <InvocationModalContainer
        config={config}
        csid="1234"
        recordType="report"
      />, context);

    const result = shallowRenderer.getRenderOutput();

    return result.props.readRecord()
      .then((recordData) => {
        recordData.should.equal(data);
      })
      .catch((err) => {
        throw err;
      });
  });
});
