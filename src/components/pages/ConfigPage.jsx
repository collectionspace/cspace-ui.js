/* global window, Blob */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <p>
        <a href={this.state.url} download="cspace-ui-config.json">
          Save configuration
        </a>
      </p>
    );
  }
}

ConfigPage.contextTypes = contextTypes;
