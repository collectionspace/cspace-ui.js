import React from 'react';
import PropTypes from 'prop-types';

export default function withRecordType(BaseComponent) {
  function WithRecordType(props, context) {
    const {
      recordType,
    } = context;

    return (
      <BaseComponent
        {...props}
        recordType={recordType}
      />
    );
  }

  WithRecordType.contextTypes = {
    recordType: PropTypes.string,
  };

  return WithRecordType;
}
