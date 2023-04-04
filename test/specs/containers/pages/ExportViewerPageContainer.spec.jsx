import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { setupWorker, rest } from 'msw';
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
  const worker = setupWorker();

  before(async function setup() {
    this.timeout(3000);

    await Promise.all([
      worker.start({ quiet: true }),
      store.dispatch(configureCSpace()).then(() => store.clearActions()),
    ]);
  });

  afterEach(() => {
    store.clearActions();
    worker.resetHandlers();
  });

  after(() => {
    worker.stop();
  });

  it('should set props on ExportViewerPage', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedExportViewerPage store={store} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ExportViewerPage);
    result.props.should.have.property('readContent').that.is.a('function');
  });

  it('should connect readContent to an action that loads the invocation descriptor and invokes the export', () => {
    let requestPayload = null;

    worker.use(
      rest.post('/cspace-services/exports', async (req, res, ctx) => {
        requestPayload = await req.json();

        return res(ctx.json({}));
      }),
    );

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedExportViewerPage store={store} />);

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
      .then((readContentResult) => {
        readContentResult.data.constructor.name.should.equal('Blob');

        requestPayload.should.deep.equal({
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
