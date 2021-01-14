import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import moxios from 'moxios';
import ExportViewerPage from '../../../../src/components/pages/ExportViewerPage';
import { ConnectedExportViewerPage } from '../../../../src/containers/pages/ExportViewerPageContainer';

import {
  configureCSpace,
} from '../../../../src/actions/cspace';

import {
  loadInvocationDescriptor,
  storeInvocationDescriptor,
} from '../../../../src/helpers/invocationHelpers';

const { expect } = chai;

chai.should();

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  user: Immutable.Map(),
});

describe('ExportViewerPageContainer', () => {
  before(() => store.dispatch(configureCSpace())
    .then(() => store.clearActions()));

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    store.clearActions();
    moxios.uninstall();
  });

  it('should set props on ExportViewerPage', () => {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedExportViewerPage />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ExportViewerPage);
    result.props.should.have.property('readContent').that.is.a('function');
  });

  it('should connect readContent to an action that loads the invocation descriptor and invokes the export', () => {
    moxios.stubRequest(/./, {
      status: 200,
      response: {},
    });

    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedExportViewerPage />, context);

    const result = shallowRenderer.getRenderOutput();
    const recordCsid = '1234';
    const recordType = 'collectionobject';
    const includeField = 'ns2:collectionspace_core/updatedAt';

    const invocationDescriptor = Immutable.fromJS({
      recordType,
      csid: recordCsid,
      mode: 'single',
      outputMIME: 'text/csv',
      includeFields: [
        includeField,
      ],
    });

    storeInvocationDescriptor(invocationDescriptor);

    return result.props.readContent()
      .then(() => {
        const request = moxios.requests.mostRecent();

        request.url.should.equal('/cspace-services/exports');
        request.responseType.should.equal('blob');

        const jsonData = request.config.data;
        const data = JSON.parse(jsonData);

        data.should.deep.equal({
          'ns2:invocationContext': {
            '@xmlns:ns2': 'http://collectionspace.org/services/common/invocable',
            includeFields: {
              field: [
                'collectionspace_core:updatedAt',
              ],
            },
            mode: 'single',
            outputMIME: 'text/csv',
            singleCSID: recordCsid,
          },
        });

        // The stored invocation descriptor should have been removed.

        expect(loadInvocationDescriptor()).to.equal(null);
      });
  });
});
