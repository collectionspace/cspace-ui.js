import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import NavBar from '../navigation/NavBar';

export default function Header(props) {
  const {
    username,
  } = props;

  return (
    <header>
      <div className="logo">
        <Link to="/" />
      </div>

      <div style={{ position: 'absolute', right: '10px', top: '29px' }}>
        {username} | <Link to="/logout">Sign out</Link>
      </div>

      <NavBar />
    </header>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
