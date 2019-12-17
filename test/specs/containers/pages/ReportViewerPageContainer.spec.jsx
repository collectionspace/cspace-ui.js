import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import moxios from 'moxios';
import get from 'lodash/get';
import ReportViewerPage from '../../../../src/components/pages/ReportViewerPage';
import { ConnectedReportViewerPage } from '../../../../src/containers/pages/ReportViewerPageContainer';

import {
  configureCSpace,
} from '../../../../src/actions/cspace';

chai.should();

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  user: Immutable.Map(),
});

describe('ReportViewerPageContainer', () => {
  before(() => store.dispatch(configureCSpace())
    .then(() => store.clearActions()));

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    store.clearActions();
    moxios.uninstall();
  });

  it('should set props on ReportViewerPage', () => {
    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedReportViewerPage />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ReportViewerPage);
    result.props.should.have.property('readContent').that.is.a('function');
  });

  it('should connect readContent to an action that invokes the report', () => {
    moxios.stubRequest(/./, {
      status: 200,
      response: {},
    });

    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedReportViewerPage />, context);

    const result = shallowRenderer.getRenderOutput();
    const reportCsid = 'abcd';
    const recordCsid = '1234';
    const recordType = 'collectionobject';

    const reportParams = {
      foo: 'abc',
      bar: 'def',
    };

    const jsonReportParams = JSON.stringify(reportParams);

    const location = {
      search: `?mode=single&csid=${recordCsid}&recordType=${recordType}&params=${jsonReportParams}`,
    };

    const match = {
      params: {
        reportCsid,
      },
    };

    return result.props.readContent(location, match)
      .then(() => {
        const request = moxios.requests.mostRecent();

        request.url.should.equal(`/cspace-services/reports/${reportCsid}`);
        request.responseType.should.equal('blob');

        const jsonData = request.config.data;
        const data = JSON.parse(jsonData);
        const params = get(data, ['ns2:invocationContext', 'params', 'param']);

        params.should.deep.equal([
          {
            key: 'foo',
            value: 'abc',
          },
          {
            key: 'bar',
            value: 'def',
          },
        ]);
      });
  });
});
