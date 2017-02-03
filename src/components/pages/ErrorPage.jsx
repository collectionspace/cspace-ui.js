import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import TitleBar from '../sections/TitleBar';
import styles from '../../../styles/cspace-ui/ErrorPage.css';

const messages = defineMessages({
  notFound: {
    id: 'errorPage.notFound',
    defaultMessage: 'Not Found',
  },
  error: {
    id: 'errorPage.error',
    defaultMessage: 'Error code: {code}',
  },
  ERR_MISSING_VOCABULARY: {
    id: 'errorPage.ERR_MISSING_VOCABULARY',
    defaultMessage: 'A vocabulary must be specified for the authority record type "{recordType}".',
  },
  ERR_UNKNOWN_RECORD_TYPE: {
    id: 'errorPage.ERR_UNKNOWN_RECORD_TYPE',
    defaultMessage: 'There is no record type named "{recordType}".',
  },
  ERR_UNKNOWN_VOCABULARY: {
    id: 'errorPage.ERR_UNKNOWN_VOCABULARY',
    defaultMessage: 'There is no vocabulary named "{vocabulary}" for the record type "{recordType}".',
  },
  ERR_UNKNOWN_SUBRESOURCE: {
    id: 'errorPage.ERR_UNKNOWN_SUBRESOURCE',
    defaultMessage: 'There is no subresource named "{subresource}".',
  },
});

const propTypes = {
  error: PropTypes.object,
};

export default function ErrorPage(props) {
  const {
    error,
  } = props;

  const { code } = error;
  const message = messages[code] || messages.error;

  return (
    <div className={styles.common}>
      <TitleBar title={<FormattedMessage {...messages.notFound} />} />
      <p><FormattedMessage {...message} values={error} /></p>
    </div>
  );
}

ErrorPage.propTypes = propTypes;
