import React from 'react';
import PropTypes from 'prop-types';

export default function withCsid(BaseComponent) {
  function WithCsid(props, context) {
    const {
      csid,
    } = context;

    return (
      <BaseComponent
        {...props}
        csid={csid}
      />
    );
  }

  WithCsid.contextTypes = {
    csid: PropTypes.string,
  };

  return WithCsid;
}
