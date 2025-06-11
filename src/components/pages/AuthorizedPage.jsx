import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../login/LoginForm';
import styles from '../../../styles/cspace-ui/AuthorizedPage.css';
import {
  getLoginError,
  getLoginLandingPath,
  getIsLoginPending,
  getIsLoginSuccess,
} from '../../reducers';
import { receiveAuthCode } from '../../actions/login';

const propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
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
    location,
  } = props;

  const isLoginPending = useSelector(getIsLoginPending);
  const isLoginSuccess = useSelector(getIsLoginSuccess);
  const landingPath = useSelector(getLoginLandingPath);
  const loginError = useSelector(getLoginError);

  const dispatch = useDispatch();

  useEffect(() => {
    const {
      search,
    } = location;

    const params = new URLSearchParams(search);
    const authCodeRequestId = params.get('state');
    const authCode = params.get('code');

    dispatch(receiveAuthCode(config, authCodeRequestId, authCode));
  }, []);

  useEffect(() => {
    if (isLoginSuccess) {
      const {
        history,
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
