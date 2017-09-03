export default () => ({
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
});
