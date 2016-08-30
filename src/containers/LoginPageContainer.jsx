import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { resetLogin } from '../actions';

import {
  getLoginContinuation,
} from '../reducers';

import LoginPage from '../components/LoginPage';

class LoginPageContainer extends Component {
  componentWillMount() {
    const {
      onMount,
    } = this.props;
    
    if (onMount) {
      onMount();
    }
  }

  render() {
    return (
      <LoginPage {...this.props} />
    );
  }
}

LoginPageContainer.propTypes = {
  onMount: PropTypes.func,
};

const mapStateToProps = state => ({
  continuation: getLoginContinuation(state),
});

const mapDispatchToProps = {
  onMount: resetLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPageContainer);
