import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import ContentViewerPage from '../../../../src/components/pages/ContentViewerPage';
import ReportViewerPage from '../../../../src/components/pages/ReportViewerPage';

chai.should();

describe('ReportViewerPage', () => {
  const readContent = () => {};

  it('should render a ContentViewerPage', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportViewerPage readContent={readContent} />, this.container,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ContentViewerPage);
  });

  it('should render a loading message', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportViewerPage readContent={readContent} />, this.container,
    );

    const result = shallowRenderer.getRenderOutput();

    result.props.renderLoading().should.not.equal(null);
  });

  it('should render an error message', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportViewerPage readContent={readContent} />, this.container,
    );

    const result = shallowRenderer.getRenderOutput();
    const error = {};

    result.props.renderError(error).should.not.equal(null);
  });
});
