import { connect } from 'react-redux';

import { login } from '../actions';

import {
  getLoginUsername,
  isLoginPending,
  getLoginResponse,
  getLoginError,
} from '../reducers';

import LoginForm from '../components/LoginForm';

const mapStateToProps = state => ({
  isPending: isLoginPending(state),
  username: getLoginUsername(state),
  response: getLoginResponse(state),
  error: getLoginError(state),
});

const mapDispatchToProps = {
  onSubmit: login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
