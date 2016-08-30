import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import LoginFormContainer from '../containers/LoginFormContainer';

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
      <LoginFormContainer onSuccess={this.onSuccess} />
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
