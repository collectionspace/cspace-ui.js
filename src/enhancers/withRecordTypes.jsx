import React, { PropTypes } from 'react';

export default function withRecordTypes(BaseComponent) {
  function WithRecordTypes(props, context) {
    const {
      recordTypes,
    } = context;

    return (
      <BaseComponent
        {...props}
        recordTypes={recordTypes}
      />
    );
  }

  WithRecordTypes.contextTypes = {
    recordTypes: PropTypes.object,
  };

  return WithRecordTypes;
}
