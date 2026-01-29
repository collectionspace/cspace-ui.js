import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import ImageContainer from '../../containers/media/ImageContainer';
import { getDerivativePath } from '../../helpers/blobHelpers';

import styles from '../../../styles/cspace-ui/Image.css';

const propTypes = {
  alt: PropTypes.string,
  csid: PropTypes.string,
  derivative: PropTypes.string,
};

const defaultProps = {
  alt: '',
  derivative: 'Thumbnail',
};

const messages = defineMessages({
  notFound: {
    id: 'blob.notFound',
    description: 'Error message when no image can be displayed',
    defaultMessage: 'No Preview Image Available',
  },
});

const renderError = () => (
  <div className={styles.noimage}>
    <FormattedMessage {...messages.notFound} />
  </div>
);

export default function BlobImage(props) {
  const {
    alt,
    csid,
    derivative,
  } = props;

  if (!csid) {
    return renderError();
  }

  const path = getDerivativePath(csid, derivative);

  return (
    <ImageContainer alt={alt} src={path} renderError={renderError} />
  );
}

BlobImage.propTypes = propTypes;
BlobImage.defaultProps = defaultProps;
