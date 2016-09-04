import React, { PropTypes } from 'react';
import { Link } from 'react-router';

require('../../styles/NavLink.css');

export default function NavLink(props) {
  const {
    to,
    children,
  } = props;

  return (
    <Link
      to={to}
      className="NavLink"
      activeClassName="active"
    >
      <div>{children}</div>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};
