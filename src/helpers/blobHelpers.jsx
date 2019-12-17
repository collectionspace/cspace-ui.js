export const VIEWER_WINDOW_NAME = 'viewer';

export const getImageViewerPath = (config, imagePath) => {
  const {
    basename,
  } = config;

  return `${basename || ''}/view/${imagePath}`;
};

export const getDerivativePath = (csid, derivative) => {
  const derivativePath = derivative ? `/derivatives/${derivative}` : '';

  return `blobs/${csid}${derivativePath}/content`;
};
