import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape } from 'react-intl';
import get from 'lodash/get';
import warning from 'warning';
import ImageContainer from '../../containers/media/ImageContainer';
import { VIEWER_WINDOW_NAME, getImageViewerPath } from '../../helpers/blobHelpers';
import styles from '../../../styles/cspace-ui/ContentViewer.css';

const getContentPath = (config, recordType, vocabulary, csid, subresource) => {
  if (!csid) {
    return null;
  }

  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  const vocabularyConfig = get(recordTypeConfig, ['vocabularies', vocabulary]);
  const subresourceConfig = get(config, ['subresources', subresource]);

  const recordServicePath = get(recordTypeConfig, ['serviceConfig', 'servicePath']);
  const vocabularyServicePath = get(vocabularyConfig, ['serviceConfig', 'servicePath']);

  const pathParts = [recordServicePath];

  if (vocabularyServicePath) {
    pathParts.push(vocabularyServicePath);
    pathParts.push('items');
  }

  pathParts.push(csid);

  if (subresourceConfig) {
    const subresourceServicePath = get(subresourceConfig, ['serviceConfig', 'servicePath']);

    if (subresourceServicePath) {
      pathParts.push(subresourceServicePath);
    }
  }

  pathParts.push('content');

  const path = pathParts.join('/');

  return path;
};

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
  config: PropTypes.object,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  intl: intlShape,
};

export default function ContentViewer(props, context) {
  const {
    config,
    recordType,
    vocabulary,
    csid,
    intl,
  } = context;

  const content = get(config, ['recordTypes', recordType, 'content']);

  warning(content, `No content descriptor found for the record type ${recordType}. The content viewer will not be rendered.`);

  if (!content) {
    return null;
  }

  const fullSubresource = get(content, ['full', 'subresource']);
  const previewSubresource = get(content, ['preview', 'subresource']);

  const fullUrl = getImageViewerPath(
    getContentPath(config, recordType, vocabulary, csid, fullSubresource)
  );

  const previewUrl = getContentPath(config, recordType, vocabulary, csid, previewSubresource);

  if (!previewUrl) {
    return null;
  }

  const previewTitle = intl.formatMessage(messages.previewTitle);
  const errorMessage = intl.formatMessage(messages.error);
  const pendingMessage = intl.formatMessage(messages.pending);

  return (
    <a className={styles.common} href={fullUrl} target={VIEWER_WINDOW_NAME}>
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
