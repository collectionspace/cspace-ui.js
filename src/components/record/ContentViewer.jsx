import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, intlShape } from 'react-intl';
import get from 'lodash/get';
import warning from 'warning';
import ImageContainer from '../../containers/media/ImageContainer';
import { VIEWER_WINDOW_NAME, getImageViewerPath } from '../../helpers/blobHelpers';
import { getContentPath } from '../../helpers/contentHelpers';
import styles from '../../../styles/cspace-ui/ContentViewer.css';

const messages = defineMessages({
  previewTitle: {
    id: 'contentViewer.previewTitle',
    defaultMessage: 'File preview',
  },
  error: {
    id: 'contentViewer.error',
    defaultMessage: 'Preview not available',
  },
  pending: {
    id: 'contentViewer.pending',
    defaultMessage: 'File preview',
  },
});

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  intl: intlShape,
  recordData: PropTypes.instanceOf(Immutable.Map),
};

export default function ContentViewer(props, context) {
  const {
    config,
    recordType,
    vocabulary,
    csid,
    intl,
    recordData,
  } = context;

  const content = get(config, ['recordTypes', recordType, 'content']);

  warning(content, `No content descriptor found for the record type ${recordType}. The content viewer will not be rendered.`);

  if (!content) {
    return null;
  }

  const popupSubresource = get(content, ['popup', 'subresource']);
  const previewSubresource = get(content, ['preview', 'subresource']);

  const popupUrl = getImageViewerPath(
    config,
    getContentPath(config, recordType, vocabulary, csid, popupSubresource, recordData),
  );

  const previewUrl = getContentPath(
    config, recordType, vocabulary, csid, previewSubresource, recordData,
  );

  if (!previewUrl) {
    return null;
  }

  const previewTitle = intl.formatMessage(messages.previewTitle);
  const errorMessage = intl.formatMessage(messages.error);
  const pendingMessage = intl.formatMessage(messages.pending);

  return (
    <a className={styles.common} href={popupUrl} target={VIEWER_WINDOW_NAME}>
      <ImageContainer
        src={previewUrl}
        alt={previewTitle}
        retry
        errorMessage={errorMessage}
        pendingMessage={pendingMessage}
      />
    </a>
  );
}

ContentViewer.contextTypes = contextTypes;
