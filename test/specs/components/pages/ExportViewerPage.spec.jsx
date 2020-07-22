import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import ContentViewerPage from '../../../../src/components/pages/ContentViewerPage';
import ExportViewerPage from '../../../../src/components/pages/ExportViewerPage';

chai.should();

describe('ExportViewerPage', () => {
  const readContent = () => {};

  it('should render a ContentViewerPage', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportViewerPage readContent={readContent} />, this.container,
    );

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ContentViewerPage);
  });

  it('should render a loading message', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportViewerPage readContent={readContent} />, this.container,
    );

    const result = shallowRenderer.getRenderOutput();

    result.props.renderLoading().should.not.equal(null);
  });

  it('should render an error message', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ExportViewerPage readContent={readContent} />, this.container,
    );

    const result = shallowRenderer.getRenderOutput();
    const error = {};

    result.props.renderError(error).should.not.equal(null);
  });
});
