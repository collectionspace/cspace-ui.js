import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createRenderer } from 'react-test-renderer/shallow';
import Immutable from 'immutable';
import { setupWorker, rest } from 'msw';
import { findWithType } from 'react-shallow-testutils';
import ContentViewerPage from '../../../../src/components/pages/ContentViewerPage';
import ContentViewerPageContainer from '../../../../src/containers/pages/ContentViewerPageContainer';

import {
  configureCSpace,
} from '../../../../src/actions/cspace';

chai.should();

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  user: Immutable.Map(),
});

describe('ContentViewerPageContainer', () => {
  const worker = setupWorker();

  before(async () => {
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

  it('should set props on ContentViewerPage', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ContentViewerPageContainer store={store} />);

    const result = shallowRenderer.getRenderOutput();
    const page = findWithType(result, ContentViewerPage);

    page.props.should.have.property('readContent').that.is.a('function');
  });

  it('should connect readContent to an action that fetches the content as a blob', () => {
    const contentPath = 'blobs/1fd5e035-b5dc-4a3b-aafb/content';

    worker.use(
      rest.get(`/cspace-services/${contentPath}`, (req, res, ctx) => res(ctx.json({}))),
    );

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ContentViewerPageContainer store={store} />);

    const result = shallowRenderer.getRenderOutput();

    const match = {
      params: {
        contentPath,
      },
    };

    return result.props.readContent(undefined, match)
      .then((readContentResult) => {
        readContentResult.data.constructor.name.should.equal('Blob');
      });
  });
});
