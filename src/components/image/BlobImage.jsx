import React, { PropTypes } from 'react';

const propTypes = {
  csid: PropTypes.string.isRequired,
  derivative: PropTypes.string,
};

const defaultProps = {
  derivative: 'Thumbnail',
};

const contextTypes = {
  config: PropTypes.object.isRequired,
};

export default function BlobImage(props, context) {
  const {
    csid,
    derivative,
  } = props;

  const {
    config,
  } = context;

  const servicesUrl = config.cspaceUrl || '';
  const url = `${servicesUrl}/cspace-services/blobs/${csid}/derivatives/${derivative}/content`;

  return (
    // TODO: Is there any alt text that would be helpful? Leaving it off for now.
    /* eslint-disable jsx-a11y/img-has-alt */
    <img src={url} />
    /* eslint-enable jsx-a11y/img-has-alt */
  );
}

BlobImage.propTypes = propTypes;
BlobImage.defaultProps = defaultProps;
BlobImage.contextTypes = contextTypes;
