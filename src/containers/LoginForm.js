import { connect } from 'react-redux';

import { login, resetLogin } from '../actions';
import {
  getLoginUsername,
  isLoginPending,
  getLoginResponse,
  getLoginError,
} from '../reducers';

import LoginForm from '../components/LoginForm';

const mapStateToProps = (state) => {
  return {
    username: getLoginUsername(state),
    isPending: isLoginPending(state),
    response: getLoginResponse(state),
    error: getLoginError(state),
  };
};

export default connect(
  mapStateToProps,
  {
    login,
    // FIXME: Put reset in onMount of this component
    onMount: resetLogin,
  }
)(LoginForm);
