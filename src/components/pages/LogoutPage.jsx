import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';

import LogoutIndicatorContainer from '../../containers/LogoutIndicatorContainer';

class LogoutPage extends Component {
  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess() {
    const {
      router,
    } = this.props;

    router.replace('/login');
  }

  render() {
    return (
      <LogoutIndicatorContainer onSuccess={this.onSuccess} />
    );
  }
}

LogoutPage.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(LogoutPage);
