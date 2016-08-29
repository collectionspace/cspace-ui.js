import React from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';

export default (props) => (
  <div>
    <h1><Link to="/">CollectionSpace</Link></h1>
    <ul role="nav">
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/logout">Logout</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      <li><NavLink to="/search">Search</NavLink></li>
    </ul>
  
    {props.children}
  </div>
);