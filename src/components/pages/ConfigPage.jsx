/* global window, Blob */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/cspace-ui/AdminTab.css';

const contextTypes = {
  config: PropTypes.object.isRequired,
};

export default class ConfigPage extends Component {
  constructor(props, context) {
    super(props, context);

    const {
      config,
    } = this.context;

    const json = JSON.stringify(config);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    this.state = {
      url,
    };
  }

  componentWillUnmount() {
    window.URL.revokeObjectURL(this.state.url);
  }

  render() {
    return (
      <div className={styles.common}>
        <a href={this.state.url} download="cspace-ui-config.json">
          Save configuration
        </a>
      </div>
    );
  }
}

ConfigPage.contextTypes = contextTypes;
