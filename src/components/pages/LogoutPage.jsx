import React, { Component } from 'react';
import PropTypes from 'prop-types';
import About from '../sections/About';
import LogoutIndicatorContainer from '../../containers/login/LogoutIndicatorContainer';
import styles from '../../../styles/cspace-ui/LoginPage.css';

const propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  logout: PropTypes.func,
  resetLogin: PropTypes.func,
};

export default class LogoutPage extends Component {
  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
  }

  componentDidMount() {
    const {
      logout,
    } = this.props;

    if (logout) {
      logout();
    }
  }

  onSuccess() {
    const {
      history,
      resetLogin,
    } = this.props;

    if (resetLogin) {
      resetLogin();
    }

    history.replace('/login');
  }

  render() {
    return (
      <div className={styles.common}>
        <div className={styles.about}><About /></div>
        <div className={styles.login}><LogoutIndicatorContainer onSuccess={this.onSuccess} /></div>
      </div>
    );
  }
}

LogoutPage.propTypes = propTypes;
