import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { setupWorker, rest } from 'msw';
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
  const worker = setupWorker();

  before(() => {
    worker.start({ quiet: true });

    return store.dispatch(configureCSpace())
      .then(() => store.clearActions());
  });

  afterEach(() => {
    store.clearActions();
    worker.resetHandlers();
  });

  after(() => {
    worker.stop();
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
    const reportCsid = 'abcd';
    const recordCsid = '1234';
    const recordType = 'collectionobject';

    let requestPayload = null;

    worker.use(
      rest.post(`/cspace-services/reports/${reportCsid}/invoke`, async (req, res, ctx) => {
        requestPayload = await req.json();

        return res(ctx.json({}));
      }),
    );

    const context = { store };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ConnectedReportViewerPage />, context);

    const result = shallowRenderer.getRenderOutput();

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
      .then((result) => {
        result.data.constructor.name.should.equal('Blob');

        const params = get(requestPayload, ['ns2:invocationContext', 'params', 'param']);

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
