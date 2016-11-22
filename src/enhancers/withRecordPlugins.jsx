import React, { PropTypes } from 'react';

export default function withRecordPlugins(BaseComponent) {
  function WithRecordPlugins(props, context) {
    const {
      recordPlugins,
    } = context;

    return (
      <BaseComponent
        {...props}
        recordPlugins={recordPlugins}
      />
    );
  }

  WithRecordPlugins.contextTypes = {
    recordPlugins: PropTypes.object,
  };

  return WithRecordPlugins;
}
