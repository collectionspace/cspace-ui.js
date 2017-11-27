import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import ContentViewerPage from '../../../../src/components/pages/ContentViewerPage';
import ReportViewerPage from '../../../../src/components/pages/ReportViewerPage';

chai.should();

describe('ReportViewerPage', function suite() {
  it('should render a ContentViewerPage', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportViewerPage readContent={() => {}} />, this.container);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ContentViewerPage);
  });

  it('should render a loading message', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <ReportViewerPage readContent={() => {}} />, this.container);

    const result = shallowRenderer.getRenderOutput();

    result.props.renderLoading().should.not.equal(null);
  });
});
