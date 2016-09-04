import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import NavLink from '../navigation/NavLink';

export default function ProtectedPage(props) {
  const {
    username,
    children,
  } = props;

  return (
    <div>
      <div style={{ position: 'absolute', right: '10px', top: '29px' }}>
        {username} | <Link to="/logout">Sign out</Link>
      </div>

      <nav>
        <ul>
          <li><NavLink to="/dashboard"><div>My CollectionSpace</div></NavLink></li>
          <li><NavLink to="/search"><div>Search</div></NavLink></li>
        </ul>
      </nav>

      {children}
    </div>
  );
}

ProtectedPage.propTypes = {
  username: PropTypes.string.isRequired,
  children: PropTypes.node,
};
