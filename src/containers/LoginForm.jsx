import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login, resetLogin } from '../actions';
import {
  getLoginUsername,
  isLoginPending,
  getLoginResponse,
  getLoginError,
} from '../reducers';

import LoginForm from '../components/LoginForm';

class LoginFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(username, password) {
    this.props.login(username, password);
  }

  render() {
    return (
      <LoginForm onSubmit={this.handleSubmit} />
    );
  }
}

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
