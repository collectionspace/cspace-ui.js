import React from 'react';
import PropTypes from 'prop-types';
import ImageContainer from '../../containers/media/ImageContainer';
import { getDerivativePath } from '../../helpers/blobHelpers';

const propTypes = {
  csid: PropTypes.string.isRequired,
  derivative: PropTypes.string,
};

const defaultProps = {
  derivative: 'Thumbnail',
};

export default function BlobImage(props) {
  const {
    csid,
    derivative,
  } = props;

  const path = getDerivativePath(csid, derivative);

  return (
    // TODO: Is there any alt text that would be helpful? Leaving it off for now.
    /* eslint-disable jsx-a11y/img-has-alt */
    <ImageContainer src={path} />
    /* eslint-enable jsx-a11y/img-has-alt */
  );
}

BlobImage.propTypes = propTypes;
BlobImage.defaultProps = defaultProps;
