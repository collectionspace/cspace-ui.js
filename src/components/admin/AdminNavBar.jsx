import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import styles from '../../../styles/cspace-ui/AdminNavBar.css';
import itemStyles from '../../../styles/cspace-ui/AdminNavItem.css';

const messages = defineMessages({
  account: {
    id: 'adminNavBar.account',
    defaultMessage: 'Users',
  },
  authrole: {
    id: 'adminNavBar.authrole',
    defaultMessage: 'Roles and Permissions',
  },
});

const renderLinkItem = (basename, tab) => (
  <li key={tab}>
    <NavLink
      to={`${basename}/${tab}`}
      className={itemStyles.common}
      activeClassName={itemStyles.active}
    >
      <FormattedMessage {...messages[tab]} />
    </NavLink>
  </li>
);

const propTypes = {
  basename: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.string),
};

export default function AdminNavBar(props) {
  const {
    basename,
    tabs,
  } = props;

  const items = tabs.map((tab) => renderLinkItem(basename, tab));

  return (
    <nav className={styles.common}>
      <ul>
        {items}
      </ul>
    </nav>
  );
}

AdminNavBar.propTypes = propTypes;
