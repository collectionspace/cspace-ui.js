import React from 'react';
import PropTypes from 'prop-types';

export default function withConfig(BaseComponent) {
  function WithConfig(props, context) {
    const {
      config,
    } = context;

    return (
      <BaseComponent
        {...props}
        config={config}
      />
    );
  }

  WithConfig.contextTypes = {
    config: PropTypes.object,
  };

  return WithConfig;
}
