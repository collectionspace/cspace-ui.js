import React, { Component, Children, useContext } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object.isRequired,
};

const childContextTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object,
};

export const ConfigContext = React.createContext(null);

export default class ConfigProvider extends Component {
  getChildContext() {
    const {
      config,
    } = this.props;

    return {
      config,
    };
  }

  render() {
    const {
      config,
      children,
    } = this.props;

    return (
      <ConfigContext.Provider value={config}>
        {Children.only(children)}
      </ConfigContext.Provider>
    );
  }
}

export function useConfig() {
  return useContext(ConfigContext);
}

ConfigProvider.propTypes = propTypes;
ConfigProvider.childContextTypes = childContextTypes;
