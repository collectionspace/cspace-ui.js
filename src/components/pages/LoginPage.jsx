/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import About from '../sections/About';
import LoginFormContainer from '../../containers/login/LoginFormContainer';
import styles from '../../../styles/cspace-ui/LoginPage.css';

const propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  onMount: PropTypes.func,
};

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.handleSuccess = this.handleSuccess.bind(this);
  }

  componentDidMount() {
    const {
      onMount,
    } = this.props;

    if (onMount) {
      onMount();
    }
  }

  handleSuccess() {
    const {
      history,
      location,
    } = this.props;

    const landing = get(location, ['state', 'continuation']) || '';

    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve();
      }, 0);
    })
    .then(() => {
      history.replace(landing);
    });
  }

  render() {
    return (
      <div className={styles.common}>
        <div className={styles.about}><About /></div>
        <div className={styles.login}><LoginFormContainer onSuccess={this.handleSuccess} /></div>
      </div>
    );
  }
}

LoginPage.propTypes = propTypes;
