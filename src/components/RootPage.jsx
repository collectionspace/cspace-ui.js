import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';

export default function RootPage(props) {
  const {
    children,
  } = props;

  return (
    <div>
      <h1><Link to="/">CollectionSpace</Link></h1>
      <ul>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/logout">Logout</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
      </ul>

      {children}
    </div>
  );
}

RootPage.propTypes = {
  children: PropTypes.node,
};
