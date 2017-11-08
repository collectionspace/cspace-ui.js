import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import NavLink from './NavLink';
import { canAdmin, canCreateNew } from '../../helpers/permissionHelpers';
import styles from '../../../styles/cspace-ui/NavBar.css';

const propTypes = {
  perms: PropTypes.instanceOf(Immutable.Map),
};

export default function NavBar(props) {
  const {
    perms,
  } = props;

  const createLink = canCreateNew(perms)
    ? <li><NavLink to="/create">Create New</NavLink></li>
    : null;

  const adminLink = canAdmin(perms)
    ? <li><NavLink to="/admin">Administration</NavLink></li>
    : null;

  return (
    <nav className={styles.common}>
      <ul>
        <li><NavLink to="/dashboard">My CollectionSpace</NavLink></li>
        {createLink}
        <li><NavLink to="/search">Search</NavLink></li>
        {adminLink}
      </ul>
    </nav>
  );
}

NavBar.propTypes = propTypes;
