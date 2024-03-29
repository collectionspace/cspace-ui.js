import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import Notification from '../notification/Notification';
import styles from '../../../styles/cspace-ui/AuthStatus.css';

const propTypes = {
  isPending: PropTypes.bool,
  isSuccess: PropTypes.bool,
  error: PropTypes.instanceOf(Immutable.Map),
  username: PropTypes.string,
};

const messages = defineMessages({
  pending: {
    id: 'authStatus.pending',
    description: 'Message displayed while login is in progress.',
    defaultMessage: 'Finishing sign in...',
  },
  success: {
    id: 'authStatus.success',
    description: 'Message displayed when login completes successfully.',
    defaultMessage: 'Signed in as {username}.',
  },
  error: {
    id: 'authStatus.error',
    description: 'Generic login error message. Displayed when a more specific error message is not available.',
    defaultMessage: 'Sign in failed.',
  },
  ERR_AUTH_CODE_REQUEST_NOT_FOUND: {
    id: 'authStatus.ERR_AUTH_CODE_REQUEST_NOT_FOUND',
    description: 'Error message displayed when an invalid authorization code request ID was received.',
    defaultMessage: 'Sign in failed. The authorization code does not belong to an active sign in request.',
  },
  ERR_BAD_REQUEST: {
    id: 'authStatus.ERR_BAD_REQUEST',
    description: 'Error message displayed when a bad request response was received during login.',
    defaultMessage: 'Sign in failed. The CollectionSpace server received a bad request.',
  },
  ERR_ACCOUNT_INACTIVE: {
    id: 'authStatus.ERR_ACCOUNT_INACTIVE',
    description: 'Error message displayed when the account is inactive during login.',
    defaultMessage: 'Sign in failed. The account is inactive.',
  },
  ERR_ACCOUNT_INVALID: {
    id: 'authStatus.ERR_ACCOUNT_INVALID',
    description: 'Error message displayed when the account is in an invalid state during login.',
    defaultMessage: 'Sign in failed. The account is in an invalid state.',
  },
  ERR_ACCOUNT_NOT_FOUND: {
    id: 'authStatus.ERR_ACCOUNT_NOT_FOUND',
    description: 'Error message displayed when the account is not found during login.',
    defaultMessage: 'Sign in failed. Account not found.',
  },
  ERR_INVALID_CREDENTIALS: {
    id: 'authStatus.ERR_INVALID_CREDENTIALS',
    description: 'Error message displayed when incorrect credentials were entered during login.',
    defaultMessage: 'Sign in failed. Incorrect username/password.',
  },
  ERR_NETWORK: {
    id: 'authStatus.ERR_NETWORK',
    description: 'Error message displayed when there is a network error during login.',
    defaultMessage: 'Sign in failed. Unable to reach the CollectionSpace server.',
  },
  ERR_WRONG_TENANT: {
    id: 'authStatus.ERR_WRONG_TENANT',
    description: 'Error message displayed when the logged in user belongs to the wrong tenant.',
    defaultMessage: 'Sign in failed. The user is not registered to this CollectionSpace tenant.',
  },
});

const renderStatus = (username, isSuccess, isPending) => {
  let messageKey;

  if (isPending) {
    messageKey = 'pending';
  } else if (isSuccess) {
    messageKey = 'success';
  }

  if (!messageKey) {
    return null;
  }

  return (
    <p><FormattedMessage {...messages[messageKey]} values={{ username }} /></p>
  );
};

const renderError = (error, isPending) => {
  if (isPending || !error) {
    return undefined;
  }

  const messageKey = error.get('code') || 'error';

  return (
    <Notification
      id="authStatus.error"
      items={[{
        message: messages[messageKey] || messages.error,
      }]}
      showCloseButton={false}
      status="error"
    />
  );
};

export default function AuthStatus(props) {
  const {
    error,
    isPending,
    isSuccess,
    username,
  } = props;

  return (
    <div className={styles.common}>
      {renderStatus(username, isSuccess, isPending)}
      {renderError(error, isPending)}
    </div>
  );
}

AuthStatus.propTypes = propTypes;
