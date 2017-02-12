import React from 'react';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-addons-test-utils';
import mockRouter from '../../../helpers/mockRouter';
import RecordButtonBar from '../../../../src/components/record/RecordButtonBar';

import {
  ConnectedRecordButtonBar,
} from '../../../../src/containers/record/RecordButtonBarContainer';

import {
  RECORD_SAVE_STARTED,
  REVERT_RECORD,
} from '../../../../src/actions/record';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('RecordButtonBarContainer', function suite() {
  it('should set props on RecordButtonBar', function test() {
    const csid = '1234';
    const router = mockRouter();

    const recordTypeConfig = {
      name: 'object',
    };

    const store = mockStore({
      record: Immutable.fromJS({
        [csid]: {
          isSavePending: true,
        },
      }),
    });

    const context = { store };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ConnectedRecordButtonBar
        csid={csid}
        router={router}
        recordTypeConfig={recordTypeConfig}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(RecordButtonBar);
    result.props.should.have.property('save').that.is.a('function');
    result.props.should.have.property('revert').that.is.a('function');

    let action;

    // The call to save will fail because we haven't stubbed out everything it needs,
    // but there's enough to verify that the saveRecord action creator gets called, and
    // dispatches RECORD_SAVE_STARTED.

    try {
      result.props.save();
    } catch (error) {
      action = store.getActions()[0];

      action.should.have.property('type', RECORD_SAVE_STARTED);
      action.should.have.deep.property('meta.csid', csid);
      action.should.have.deep.property('meta.recordTypeConfig', recordTypeConfig);
    }

    store.clearActions();

    result.props.revert();

    action = store.getActions()[0];

    action.should.have.property('type', REVERT_RECORD);
    action.should.have.deep.property('meta.csid', csid);
  });
});

