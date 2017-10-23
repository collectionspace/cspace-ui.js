/* global window */

import React from 'react';
import configureMockStore from 'redux-mock-store';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import MiniView from '../../../../src/components/record/MiniView';
import MiniViewContainer from '../../../../src/containers/record/MiniViewContainer';

import {
  RECORD_READ_STARTED,
  VALIDATION_PASSED,
} from '../../../../src/actions/record';

import {
  SET_FORM,
} from '../../../../src/actions/prefs';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('MiniViewContainer', function suite() {
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
    forms: {
      mini: {
        messages: {
          name: {
            id: 'form.collectionobject.mini.name',
            defaultMessage: 'Mini Template',
          },
        },
        template: (
          <div>
            <h1>Template</h1>
          </div>
        ),
      },
    },
  };

  const config = {
    recordTypes: {
      [recordType]: recordTypeConfig,
    },
  };

  const store = mockStore({
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

  it('should set props on MiniView', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MiniViewContainer
        config={config}
        csid={csid}
        recordType={recordType}
      />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(MiniView);
    result.props.should.have.property('data', data);
    result.props.should.have.property('readRecord').that.is.a('function');
  });

  it('should connect readRecord to readRecord action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MiniViewContainer
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

  it('should connect validateRecordData to validateRecordData action creator', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MiniViewContainer
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

  it('should connect setForm to setForm action creator', function test() {
    const formName = 'formName';

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MiniViewContainer
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
