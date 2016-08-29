import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import LoginForm from '../containers/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess() {
    const {
      router,
      continuation,
    } = this.props;

    router.replace(continuation);
  }

  render() {
    return (
      <LoginForm onSuccess={this.onSuccess} />
    );
  }
}

LoginPage.propTypes = {
  router: PropTypes.object.isRequired,
  continuation: PropTypes.string,
};

LoginPage.defaultProps = {
  continuation: '/',
};

export default withRouter(LoginPage);
