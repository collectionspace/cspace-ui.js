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
  vocabulary: {
    id: 'adminNavBar.vocabulary',
    defaultMessage: 'Term Lists',
  },
});

const renderLinkItem = (basename, tab) => {
  const { name } = tab;

  return (
    <li key={name}>
      <NavLink
        to={`${basename}/${name}`}
        className={itemStyles.normal}
        activeClassName={itemStyles.active}
      >
        <FormattedMessage {...messages[name]} />
      </NavLink>
    </li>
  );
};

const propTypes = {
  basename: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.object),
};

export default function AdminNavBar(props) {
  const {
    basename,
    tabs,
  } = props;

  const items = tabs.map(tab => renderLinkItem(basename, tab));

  return (
    <nav className={styles.common}>
      <ul>
        {items}
      </ul>
    </nav>
  );
}

AdminNavBar.propTypes = propTypes;
