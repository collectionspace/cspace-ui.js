import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { ERR_WRONG_TENANT } from '../../constants/errorCodes';
import styles from '../../../styles/cspace-ui/LoginForm.css';
import AuthStatusContainer from '../../containers/login/AuthStatusContainer';
import LoginLink from './LoginLink';

const messages = defineMessages({
  prompt: {
    id: 'loginForm.prompt',
    description: 'The prompt displayed on the login form when the user is not logged in.',
    defaultMessage: 'Please sign in to continue.',
  },
  expiredPrompt: {
    id: 'loginForm.expiredPrompt',
    description: 'The prompt displayed on the login form when the login session has expired.',
    defaultMessage: 'Your sign in has expired. Please renew it to continue.',
  },
  loginWindowOpen: {
    id: 'loginForm.loginWindowOpen',
    description: 'The message displayed on the login form when a login pop-up is open.',
    defaultMessage: 'Sign in is in progress in another browser window.',
  },
  loginWindowOpenFailed: {
    id: 'loginForm.loginWindowOpenFailed',
    description: 'The message displayed on the login form when a login pop-up fails to open.',
    defaultMessage: 'The sign in window could not be opened. Please allow pop-ups for this site.',
  },
  logout: {
    id: 'loginForm.logout',
    description: 'The content of the logout link displayed when authorization fails.',
    defaultMessage: 'Sign out to change to another user.',
  },
});

const propTypes = {
  isLoginExpired: PropTypes.bool,
  isLoginPending: PropTypes.bool,
  isLoginSuccess: PropTypes.bool,
  isLoginWindowOpen: PropTypes.bool,
  isLoginWindowOpenFailed: PropTypes.bool,
  loginError: PropTypes.instanceOf(Immutable.Map),
  openLoginWindow: PropTypes.func,
  showPrompt: PropTypes.bool,
};

const defaultProps = {
  isLoginExpired: false,
  isLoginPending: false,
  isLoginSuccess: false,
  isLoginWindowOpen: false,
  isLoginWindowOpenFailed: false,
  loginError: null,
  openLoginWindow: null,
  showPrompt: false,
};

export default function LoginForm(props) {
  const {
    isLoginExpired,
    isLoginPending,
    isLoginSuccess,
    isLoginWindowOpen,
    isLoginWindowOpenFailed,
    loginError,
    openLoginWindow,
    showPrompt,
  } = props;

  let prompt = null;

  if (!isLoginSuccess && !isLoginPending && !loginError && showPrompt) {
    const messageKey = isLoginExpired
      ? 'expiredPrompt'
      : 'prompt';

    prompt = (
      <p><FormattedMessage {...messages[messageKey]} /></p>
    );
  }

  const errorCode = loginError && loginError.get('code');

  return (
    <div className={styles.common}>
      {isLoginWindowOpen && (
        <FormattedMessage {...messages.loginWindowOpen} />
      )}

      {!isLoginWindowOpen && (
        <>
          <AuthStatusContainer />

          {prompt}

          {!isLoginSuccess && !isLoginPending && (
            <p>
              {errorCode === ERR_WRONG_TENANT
                ? <Link to="/logout"><FormattedMessage {...messages.logout} /></Link>
                : <LoginLink openLoginWindow={openLoginWindow} />}
            </p>
          )}
        </>
      )}

      {isLoginWindowOpenFailed && (
        <FormattedMessage {...messages.loginWindowOpenFailed} />
      )}
    </div>
  );
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;
