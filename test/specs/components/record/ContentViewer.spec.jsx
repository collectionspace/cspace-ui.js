import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import ContentViewer from '../../../../src/components/record/ContentViewer';

const expect = chai.expect;

chai.should();

describe('ContentViewer', function suite() {
  const csid = '1234';

  const intl = {
    formatDate: () => null,
    formatTime: () => null,
    formatRelative: () => null,
    formatNumber: () => null,
    formatPlural: () => null,
    formatMessage: message => `formatted ${message.id}`,
    formatHTMLMessage: () => null,
    now: () => null,
  };

  const config = {
    recordTypes: {
      media: {
        content: {
          full: {
            subresource: 'original',
          },
          preview: {
            subresource: 'derivativeThumbnail',
          },
        },
        serviceConfig: {
          servicePath: 'media',
        },
      },
      schmedia: {
        content: {
          full: {
            subresource: 'original',
          },
          preview: {
            subresource: null,
          },
        },
        serviceConfig: {
          servicePath: 'schmedia',
        },
      },
      someAuthority: {
        content: {
          full: {
            subresource: 'original',
          },
          preview: {
            subresource: 'derivativeThumbnail',
          },
        },
        serviceConfig: {
          servicePath: 'someAuthority',
        },
        vocabularies: {
          local: {
            serviceConfig: {
              servicePath: 'local',
            },
          },
        },
      },
    },
    subresources: {
      original: {
        serviceConfig: {
          servicePath: '',
        },
      },
      derivativeThumbnail: {
        serviceConfig: {
          servicePath: 'derivatives/Thumbnail',
        },
      },
      derivativeMedium: {
        serviceConfig: {
          servicePath: 'derivatives/Medium',
        },
      },
      derivativeOriginalJpeg: {
        serviceConfig: {
          servicePath: 'derivatives/OriginalJpeg',
        },
      },
    },
  };

  it('should render a link containing an img', function test() {
    const context = {
      config,
      csid,
      intl,
      recordType: 'media',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ContentViewer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('a');
    result.props.href.should.equal(`/cspace-services/media/${csid}/content`);

    const img = findWithType(result, 'img');

    img.should.not.equal(null);
    img.props.src.should.equal(`/cspace-services/media/${csid}/derivatives/Thumbnail/content`);
  });

  it('should render a link containing an img for an authority record type', function test() {
    const context = {
      config,
      intl,
      csid,
      recordType: 'someAuthority',
      vocabulary: 'local',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ContentViewer />, context);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('a');
    result.props.href.should.equal(`/cspace-services/someAuthority/local/items/${csid}/content`);

    const img = findWithType(result, 'img');

    img.should.not.equal(null);
    img.props.src.should.equal(`/cspace-services/someAuthority/local/items/${csid}/derivatives/Thumbnail/content`);
  });

  it('should render nothing if content is not configured for the record type', function test() {
    const context = {
      config,
      csid,
      intl,
      recordType: 'foo',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ContentViewer />, context);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should render nothing if no csid is present in context', function test() {
    const context = {
      config,
      intl,
      csid: undefined,
      recordType: 'media',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ContentViewer />, context);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should render nothing for an unknown record type', function test() {
    const context = {
      config,
      intl,
      csid: undefined,
      recordType: 'oh no',
    };

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ContentViewer />, context);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });
});
