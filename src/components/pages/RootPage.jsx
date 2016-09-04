import React, { PropTypes } from 'react';

require('../../styles/cspace-ui.css');

export default function RootPage(props) {
  const {
    children,
  } = props;

  return (
    <div className="cspace-ui">
      {children}
    </div>
  );
}

RootPage.propTypes = {
  children: PropTypes.node,
};
