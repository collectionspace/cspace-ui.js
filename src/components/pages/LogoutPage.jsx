/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import styles from '../../../styles/cspace-ui/WelcomePage.css';

const propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  logout: PropTypes.func,
};

const defaultProps = {
  logout: null,
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }).isRequired,
};

export default class LogoutPage extends Component {
  componentDidMount() {
    const {
      location,
    } = this.props;

    const query = qs.parse(location.search.substring(1));

    if ('success' in query) {
      // Log out from the services layer succeeded. Continue with client log out.

      this.finishLogout();
    } else {
      this.startServicesLogout();
    }
  }

  startServicesLogout() {
    const {
      config,
    } = this.context;

    const {
      serverUrl,
    } = config;

    const redirectUrl = new URL(window.location.href);

    redirectUrl.search = 'success';

    const redirect = serverUrl
      ? redirectUrl.href
      : `/..${redirectUrl.pathname}${redirectUrl.search}`;

    const queryString = qs.stringify({
      redirect,
    });

    window.location.replace(`${serverUrl}/cspace-services/logout?${queryString}`);
  }

  finishLogout() {
    const {
      history,
      logout,
    } = this.props;

    if (logout) {
      logout();
    }

    history.replace('/welcome');
  }

  render() {
    return (
      <div className={styles.common} />
    );
  }
}

LogoutPage.propTypes = propTypes;
LogoutPage.defaultProps = defaultProps;
LogoutPage.contextTypes = contextTypes;
