/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import About from '../sections/About';
import LoginFormContainer from '../../containers/login/LoginFormContainer';
import styles from '../../../styles/cspace-ui/LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
  }

  componentWillMount() {
    const {
      onMount,
    } = this.props;

    if (onMount) {
      onMount();
    }
  }

  onSuccess() {
    const {
      router,
      continuation,
    } = this.props;

    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve();
      }, 0);
    })
    .then(() => {
      router.replace(continuation);
    });
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
  onMount: PropTypes.func,
};

LoginPage.defaultProps = {
  continuation: '/',
};

export default withRouter(LoginPage);
