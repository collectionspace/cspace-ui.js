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
    <ImageContainer src={path} />
  );
}

BlobImage.propTypes = propTypes;
BlobImage.defaultProps = defaultProps;
