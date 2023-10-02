import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import LoginForm from '../login/LoginForm';
import styles from '../../../styles/cspace-ui/AuthorizedPage.css';

const propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  isLoginPending: PropTypes.bool,
  isLoginSuccess: PropTypes.bool,
  landingPath: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  loginError: PropTypes.instanceOf(Immutable.Map),
  receiveAuthCode: PropTypes.func.isRequired,
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }).isRequired,
};

export default function AuthorizedPage(props, context = {}) {
  const {
    config,
  } = context;

  const {
    isLoginPending,
    isLoginSuccess,
    location,
    loginError,
    receiveAuthCode,
  } = props;

  useEffect(() => {
    const {
      search,
    } = location;

    const params = new URLSearchParams(search);
    const authCodeRequestId = params.get('state');
    const authCode = params.get('code');

    receiveAuthCode(config, authCodeRequestId, authCode);
  }, []);

  useEffect(() => {
    if (isLoginSuccess) {
      const {
        history,
        landingPath,
      } = props;

      history.replace(landingPath);
    }
  }, [isLoginSuccess]);

  return (
    <div className={styles.common}>
      <LoginForm
        isLoginSuccess={isLoginSuccess}
        isLoginPending={isLoginPending}
        loginError={loginError}
      />
    </div>
  );
}

AuthorizedPage.propTypes = propTypes;
AuthorizedPage.contextTypes = contextTypes;
