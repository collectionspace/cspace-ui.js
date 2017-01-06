import React, { PropTypes } from 'react';

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
