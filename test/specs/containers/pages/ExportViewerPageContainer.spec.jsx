import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import moxios from 'moxios';
import get from 'lodash/get';
import ExportViewerPage from '../../../../src/components/pages/ExportViewerPage';
import { ConnectedExportViewerPage } from '../../../../src/containers/pages/ExportViewerPageContainer';

import {
  configureCSpace,
} from '../../../../src/actions/cspace';

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

  it('should connect readContent to an action that invokes the export', () => {
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

    const location = {
      search: `?mode=list&csid[0]=${recordCsid}&recordType=${recordType}&includeFields[0]=${includeField}`,
    };

    return result.props.readContent(location)
      .then(() => {
        const request = moxios.requests.mostRecent();

        request.url.should.equal('/cspace-services/exports');
        request.responseType.should.equal('blob');

        const jsonData = request.config.data;
        const data = JSON.parse(jsonData);

        get(data, ['ns2:invocationContext', 'includeFields', 'field']).should.deep.equal([
          'collectionspace_core:updatedAt',
        ]);
      });
  });
});
