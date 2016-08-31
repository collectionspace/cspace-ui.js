import React, { PropTypes } from 'react';

import Header from './Header';
import NavLink from './NavLink';

require('../styles/CSpaceUI.css');

export default function RootPage(props) {
  const {
    children,
  } = props;

  return (
    <div className="CSpaceUI">
      <Header />

      {children}
    </div>
  );
}

RootPage.propTypes = {
  children: PropTypes.node,
};
