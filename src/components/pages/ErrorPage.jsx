import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import TitleBar from '../sections/TitleBar';

import {
  ERR_API,
  ERR_NOT_ALLOWED,
  ERR_NOT_FOUND,
  ERR_MISSING_VOCABULARY,
  ERR_UNKNOWN_RECORD_TYPE,
  ERR_UNKNOWN_VOCABULARY,
  ERR_INVALID_CSID,
  ERR_INVALID_RELATED_TYPE,
  ERR_UNKNOWN_SUBRESOURCE,
} from '../../constants/errorCodes';

import styles from '../../../styles/cspace-ui/ErrorPage.css';

const messages = defineMessages({
  title: {
    id: 'errorPage.title',
    defaultMessage: 'Page Not Found',
  },
  error: {
    id: 'errorPage.error',
    defaultMessage: 'Error code: {code}',
  },
  [ERR_NOT_ALLOWED]: {
    id: 'errorPage.ERR_NOT_ALLOWED',
    defaultMessage: 'You\'re not allowed to view this type of record.',
  },
  [ERR_NOT_FOUND]: {
    id: 'errorPage.ERR_NOT_FOUND',
    defaultMessage: 'The record you\'re looking for doesn\'t seem to exist.',
  },
  [ERR_MISSING_VOCABULARY]: {
    id: 'errorPage.ERR_MISSING_VOCABULARY',
    defaultMessage: 'A vocabulary must be specified for the authority record type "{recordType}".',
  },
  [ERR_UNKNOWN_RECORD_TYPE]: {
    id: 'errorPage.ERR_UNKNOWN_RECORD_TYPE',
    defaultMessage: 'There is no record type named "{recordType}".',
  },
  [ERR_UNKNOWN_VOCABULARY]: {
    id: 'errorPage.ERR_UNKNOWN_VOCABULARY',
    defaultMessage: 'There is no vocabulary named "{vocabulary}" for the record type "{recordType}".',
  },
  [ERR_INVALID_CSID]: {
    id: 'errorPage.ERR_INVALID_CSID',
    defaultMessage: '"{csid}" is not a valid CSID.',
  },
  [ERR_INVALID_RELATED_TYPE]: {
    id: 'errorPage.ERR_INVALID_RELATED_TYPE',
    defaultMessage: 'The record type "{recordType}" does not have a related type "{relatedRecordType}".',
  },
  [ERR_UNKNOWN_SUBRESOURCE]: {
    id: 'errorPage.ERR_UNKNOWN_SUBRESOURCE',
    defaultMessage: 'There is no subresource named "{subresource}".',
  },
});

// TODO: The error prop should be an Immutable.Map. Most errors come from the store, so they are
// already immutable maps, which then have to be converted by the caller to an object before
// passing in to the error page. Errors coming from location validation are created as objects,
// but they can be changed to be created as immutable maps.

const propTypes = {
  error: PropTypes.object,
};

export default function ErrorPage(props) {
  const {
    error,
  } = props;

  let { code } = error;

  if (code === ERR_API) {
    const status = get(error, ['error', 'response', 'status']);

    if (status === 404) {
      // Convert 404 from the REST API into ERR_NOT_FOUND.
      code = ERR_NOT_FOUND;
    } else if (status === 401) {
      // Convert 401 to ERR_NOT_ALLOWED.
      code = ERR_NOT_ALLOWED;
    }
  }

  const message = messages[code] || messages.error;

  return (
    <div className={styles.common}>
      <TitleBar title={<FormattedMessage {...messages.title} />} />
      <p><FormattedMessage {...message} values={error} /></p>
    </div>
  );
}

ErrorPage.propTypes = propTypes;
