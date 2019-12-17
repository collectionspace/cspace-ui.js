import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import ImageContainer from '../../../../src/containers/media/ImageContainer';
import BlobImage from '../../../../src/components/media/BlobImage';

chai.should();

describe('BlobImage', () => {
  it('should render as an ImageContainer', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<BlobImage csid="1234" derivative="Small" />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal(ImageContainer);
  });

  it('should insert the csid and derivative name into the img src url', () => {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<BlobImage csid="1234" derivative="Small" />);

    const result = shallowRenderer.getRenderOutput();

    result.props.src.should.equal('blobs/1234/derivatives/Small/content');
  });
});
