/* global window */

import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import About from '../sections/About';
import LoginFormContainer from '../../containers/login/LoginFormContainer';
import styles from '../../../styles/cspace-ui/LoginPage.css';

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

    window.setTimeout(() => router.replace(continuation), 0);
  }

  render() {
    return (
      <div className={styles.common}>
        <div className={styles.about}><About /></div>
        <div className={styles.login}><LoginFormContainer onSuccess={this.onSuccess} /></div>
      </div>
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
