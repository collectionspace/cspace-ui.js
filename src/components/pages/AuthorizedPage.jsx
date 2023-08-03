/* global window */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Notification from '../notification/Notification';
import styles from '../../../styles/cspace-ui/AuthorizedPage.css';
import loginStyles from '../../../styles/cspace-ui/LoginForm.css';

const propTypes = {
  isPending: PropTypes.bool,
  isSuccess: PropTypes.bool,
  error: PropTypes.instanceOf(Immutable.Map),
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  loginWithAuthCodeRequest: PropTypes.func.isRequired,
  username: PropTypes.string,
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }).isRequired,
};

const messages = defineMessages({
  pending: {
    id: 'authorizedPage.pending',
    description: 'Message displayed while login is in progress.',
    defaultMessage: 'Finishing sign in...',
  },
  success: {
    id: 'authorizedPage.success',
    description: 'Message displayed when login completes successfully.',
    defaultMessage: 'Signed in as {username}.',
  },
  error: {
    id: 'authorizedPage.error',
    description: 'Generic login error message. Displayed when a more specific error message is not available.',
    defaultMessage: 'Sign in failed.',
  },
  retry: {
    id: 'authorizedPage.retry',
    description: 'Text of the link to retry login after a failure.',
    defaultMessage: 'Try again',
  },
  ERR_AUTH_CODE_REQUEST_NOT_FOUND: {
    id: 'authorizedPage.ERR_AUTH_CODE_REQUEST_NOT_FOUND',
    description: 'Error message displayed when an invalid authorization code request ID was received.',
    defaultMessage: 'Sign in failed. The authorization code does not belong to an active sign in request.',
  },
  ERR_BAD_REQUEST: {
    id: 'authorizedPage.ERR_BAD_REQUEST',
    description: 'Error message displayed when a bad request response was received during login.',
    defaultMessage: 'Sign in failed. The CollectionSpace server received a bad request.',
  },
  ERR_ACCOUNT_INACTIVE: {
    id: 'authorizedPage.ERR_ACCOUNT_INACTIVE',
    description: 'Error message displayed when the account is inactive during login.',
    defaultMessage: 'Sign in failed. The account is inactive.',
  },
  ERR_ACCOUNT_INVALID: {
    id: 'authorizedPage.ERR_ACCOUNT_INVALID',
    description: 'Error message displayed when the account is in an invalid state during login.',
    defaultMessage: 'Sign in failed. The account is in an invalid state.',
  },
  ERR_ACCOUNT_NOT_FOUND: {
    id: 'authorizedPage.ERR_ACCOUNT_NOT_FOUND',
    description: 'Error message displayed when the account is not found during login.',
    defaultMessage: 'Sign in failed. Account not found.',
  },
  ERR_INVALID_CREDENTIALS: {
    id: 'authorizedPage.ERR_INVALID_CREDENTIALS',
    description: 'Error message displayed when incorrect credentials were entered during login.',
    defaultMessage: 'Sign in failed. Incorrect username/password.',
  },
  ERR_NETWORK: {
    id: 'authorizedPage.ERR_NETWORK',
    description: 'Error message displayed when there is a network error during login.',
    defaultMessage: 'Sign in failed. Unable to reach the CollectionSpace server.',
  },
  ERR_WRONG_TENANT: {
    id: 'authorizedPage.ERR_WRONG_TENANT',
    description: 'Error message displayed when the logged in user belongs to the wrong tenant.',
    defaultMessage: 'Sign in failed. The user is not registered to this CollectionSpace tenant.',
  },
});

const handleSuccess = (props) => {
  if (window.opener && window.opener.onAuthorizationSuccess != null) {
    window.opener.onAuthorizationSuccess();
    window.close();

    return;
  }

  const {
    history,
    landingPath,
  } = props;

  history.replace(landingPath);
};

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
      id="authorizedPage.error"
      items={[{
        message: messages[messageKey] || messages.error,
      }]}
      showCloseButton={false}
      status="error"
    />
  );
};

const renderReturnLink = (error) => {
  if (!error) {
    return undefined;
  }

  return (
    <p>
      <Link to="/login"><FormattedMessage {...messages.retry} /></Link>
    </p>
  );
};

export default function AuthorizedPage(props, context = {}) {
  const {
    config,
  } = context;

  const {
    error,
    isPending,
    isSuccess,
    location,
    loginWithAuthCodeRequest,
    username,
  } = props;

  useEffect(() => {
    const {
      search,
    } = location;

    const params = new URLSearchParams(search);
    const authCodeRequestId = params.get('state');
    const authCode = params.get('code');

    loginWithAuthCodeRequest(config, authCodeRequestId, authCode);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      handleSuccess(props);
    }
  }, [isSuccess]);

  let contentClassName;

  if (isPending) {
    contentClassName = loginStyles.pending;
  } else if (isSuccess) {
    contentClassName = loginStyles.success;
  } else {
    contentClassName = loginStyles.common;
  }

  return (
    <div className={styles.common}>
      <div className={contentClassName}>
        {renderStatus(username, isSuccess, isPending)}
        {renderError(error, isPending)}
        {renderReturnLink(error)}
      </div>
    </div>
  );
}

AuthorizedPage.propTypes = propTypes;
AuthorizedPage.contextTypes = contextTypes;
