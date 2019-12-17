import React from 'react';
import PropTypes from 'prop-types';

export default function withConfig(BaseComponent) {
  function WithConfig(props, context) {
    const {
      config,
    } = context;

    return (
      <BaseComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        config={config}
      />
    );
  }

  WithConfig.contextTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    config: PropTypes.object,
  };

  return WithConfig;
}
