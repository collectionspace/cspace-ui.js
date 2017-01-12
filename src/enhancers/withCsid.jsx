import React, { PropTypes } from 'react';

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
