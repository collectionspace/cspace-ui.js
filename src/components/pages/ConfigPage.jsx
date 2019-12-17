/* global window, Blob */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }).isRequired,
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

  componentDidMount() {
    const {
      config,
    } = this.context;

    // eslint-disable-next-line no-console
    console.log(config);
  }

  componentWillUnmount() {
    const {
      url,
    } = this.state;

    window.URL.revokeObjectURL(url);
  }

  render() {
    const {
      url,
    } = this.state;

    return (
      <div>
        <p>
          UI configuration has been printed to the console.
        </p>
        <p>
          <a href={url} download="cspace-ui-config.json">
            Save configuration as JSON
          </a>
        </p>
      </div>
    );
  }
}

ConfigPage.contextTypes = contextTypes;
