import React, { PropTypes } from 'react';

import Header from '../sections/Header';

require('../../styles/cspace-ui.css');

export default function RootPage(props) {
  const {
    children,
  } = props;

  return (
    <div className="cspace-ui">
      <Header />

      {children}
    </div>
  );
}

RootPage.propTypes = {
  children: PropTypes.node,
};
