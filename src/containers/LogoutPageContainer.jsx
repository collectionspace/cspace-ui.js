import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { logout } from '../actions';

import LogoutPage from '../components/LogoutPage';

class LogoutPageContainer extends Component {
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
      <LogoutPage {...this.props} />
    );
  }
}

LogoutPageContainer.propTypes = {
  onMount: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onMount: logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutPageContainer);
