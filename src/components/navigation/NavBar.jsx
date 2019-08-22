import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import NavLink from './NavLink';
import { canAdmin, canCreateNew, canTool } from '../../helpers/permissionHelpers';
import styles from '../../../styles/cspace-ui/NavBar.css';

const messages = defineMessages({
  admin: {
    id: 'navBar.admin',
    defaultMessage: 'Administration',
  },
  create: {
    id: 'navBar.create',
    defaultMessage: 'Create New',
  },
  dashboard: {
    id: 'navBar.dashboard',
    defaultMessage: 'My CollectionSpace',
  },
  search: {
    id: 'navBar.search',
    defaultMessage: 'Search',
  },
  tool: {
    id: 'navBar.tool',
    defaultMessage: 'Tools',
  },
});

const propTypes = {
  perms: PropTypes.instanceOf(Immutable.Map),
};

export default function NavBar(props) {
  const {
    perms,
  } = props;

  const createLink = canCreateNew(perms)
    ? <li><NavLink to="/create"><FormattedMessage {...messages.create} /></NavLink></li>
    : null;

  const toolLink = canTool(perms)
    ? <li><NavLink to="/tool"><FormattedMessage {...messages.tool} /></NavLink></li>
    : null;

  const adminLink = canAdmin(perms)
    ? <li><NavLink to="/admin"><FormattedMessage {...messages.admin} /></NavLink></li>
    : null;

  return (
    <nav className={styles.common}>
      <ul>
        <li><NavLink to="/dashboard"><FormattedMessage {...messages.dashboard} /></NavLink></li>
        {createLink}
        <li><NavLink to="/search"><FormattedMessage {...messages.search} /></NavLink></li>
        {toolLink}
        {adminLink}
      </ul>
    </nav>
  );
}

NavBar.propTypes = propTypes;
