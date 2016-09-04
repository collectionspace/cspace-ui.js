import React from 'react';
import NavLink from './NavLink';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/dashboard">My CollectionSpace</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
      </ul>
    </nav>
  );
}
