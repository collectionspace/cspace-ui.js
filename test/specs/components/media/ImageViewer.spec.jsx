import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import ImageViewer from '../../../../src/components/media/ImageViewer';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';

const { expect } = chai;

chai.should();

describe('ImageViewer', () => {
  const blobUrl = '1234';

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render an OpenSeadragon viewer', function test() {
    render(<ImageViewer blobUrl={blobUrl} />, this.container);

    this.container.querySelector('.openseadragon-container').should.not.equal(null);
  });

  it('should destroy the OpenSeadragon viewer when unmounted', function test() {
    render(<ImageViewer blobUrl={blobUrl} />, this.container);

    unmountComponentAtNode(this.container);

    // FIXME: This isn't really a useful test. Need to check that all JS resources were released,
    // not just that the DOM node was removed.
    expect(this.container.querySelector('.openseadragon-container')).to.equal(null);
  });
});
