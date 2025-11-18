import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ImageContainer from '../../containers/media/ImageContainer';
import { getDerivativePath } from '../../helpers/blobHelpers';

import styles from '../../../styles/cspace-ui/Image.css';

const propTypes = {
  csid: PropTypes.string.isRequired,
  derivative: PropTypes.string,
};

const defaultProps = {
  derivative: 'Thumbnail',
};

const renderError = () => (
  <div className={styles.noimage}>
    <FormattedMessage
      id="blob.error"
      description="Error message when no image can be displayed"
      defaultMessage="no image found"
    />
  </div>
);

export default function BlobImage(props) {
  const {
    csid,
    derivative,
  } = props;

  if (!csid) {
    return renderError();
  }

  const path = getDerivativePath(csid, derivative);

  return (
    <ImageContainer src={path} renderError={renderError} />
  );
}

BlobImage.propTypes = propTypes;
BlobImage.defaultProps = defaultProps;
