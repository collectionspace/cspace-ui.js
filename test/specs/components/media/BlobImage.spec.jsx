import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

import BlobImage from '../../../../src/components/media/BlobImage';

chai.should();

describe('BlobImage', function suite() {
  it('should render as an img', function test() {
    const config = {};

    const context = { config };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<BlobImage csid="1234" derivative="Small" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('img');
  });

  it('should insert the csid and derivative name into the img src url', function test() {
    const config = {};

    const context = { config };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<BlobImage csid="1234" derivative="Small" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.src.should.equal('/cspace-services/blobs/1234/derivatives/Small/content');
  });

  it('should insert the serverUrl from config into the img src url, if present', function test() {
    const config = {
      serverUrl: 'http://collectionspace.org',
    };

    const context = { config };
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<BlobImage csid="1234" derivative="Small" />, context);

    const result = shallowRenderer.getRenderOutput();

    result.props.src.should.equal('http://collectionspace.org/cspace-services/blobs/1234/derivatives/Small/content');
  });
});
