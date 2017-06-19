import React, { Component } from 'react';
import PropTypes from 'prop-types';
import About from '../sections/About';
import LogoutIndicatorContainer from '../../containers/login/LogoutIndicatorContainer';
import styles from '../../../styles/cspace-ui/LoginPage.css';

const propTypes = {
  history: PropTypes.object.isRequired,
  onMount: PropTypes.func,
};

export default class LogoutPage extends Component {
  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
  }

  componentDidMount() {
    const {
      onMount,
    } = this.props;

    if (onMount) {
      onMount();
    }
  }

  onSuccess() {
    const {
      history,
    } = this.props;

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
