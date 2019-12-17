import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import ContentViewerPage from './ContentViewerPage';
import getErrorDescription from '../../helpers/getErrorDescription';
import styles from '../../../styles/cspace-ui/ReportViewerPage.css';

const messages = defineMessages({
  error: {
    id: 'reportViewerPage.error',
    description: 'Message displayed when a report invocation fails.',
    defaultMessage: 'Error running report: {error}',
  },
  loading: {
    id: 'reportViewerPage.loading',
    description: 'Message displayed when a report is loading.',
    defaultMessage: 'Generating report…',
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

export default function ReportViewerPage(props) {
  return (
    <ContentViewerPage
      renderError={renderError}
      renderLoading={renderLoading}
      {...props}
    />
  );
}
