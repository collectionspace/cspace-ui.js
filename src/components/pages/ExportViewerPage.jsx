import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import ContentViewerPage from './ContentViewerPage';
import getErrorDescription from '../../helpers/getErrorDescription';
import styles from '../../../styles/cspace-ui/ContentViewerPage.css';

const messages = defineMessages({
  error: {
    id: 'exportViewerPage.error',
    description: 'Message displayed when an export invocation fails.',
    defaultMessage: 'Error generating export: {error}',
  },
  loading: {
    id: 'exportViewerPage.loading',
    description: 'Message displayed when a export is loading.',
    defaultMessage: 'Generating export…',
  },
});

const renderLoading = () => (
  <div className={styles.pending}>
    <FormattedMessage {...messages.loading} />
  </div>
);

const renderError = (error) => (
  <div className={styles.error}>
    <FormattedMessage
      {...messages.error}
      values={{
        error: getErrorDescription(error),
      }}
    />
  </div>
);

export default function ExportViewerPage(props) {
  return (
    <ContentViewerPage
      renderError={renderError}
      renderLoading={renderLoading}
      {...props}
    />
  );
}
