import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import ContentViewerPage from './ContentViewerPage';
import styles from '../../../styles/cspace-ui/ReportViewerPage.css';

const messages = defineMessages({
  loading: {
    id: 'reportViewerPage.loading',
    description: 'Message displayed when a report is loading.',
    defaultMessage: 'Generating report…',
  },
});

const renderLoading = () => (
  <div className={styles.common}>
    <FormattedMessage {...messages.loading} />
  </div>
);

export default function ReportViewerPage(props) {
  return (
    <ContentViewerPage
      renderLoading={renderLoading}
      {...props}
    />
  );
}
