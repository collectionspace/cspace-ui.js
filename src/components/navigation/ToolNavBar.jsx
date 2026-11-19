import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from '../../../styles/cspace-ui/AdminNavBar.css';
import itemStyles from '../../../styles/cspace-ui/AdminNavItem.css';

const messages = defineMessages({
  report: {
    id: 'toolNavBar.report',
    defaultMessage: 'Reports',
  },
  batch: {
    id: 'toolNavBar.batch',
    defaultMessage: 'Data Updates',
  },
  vocabulary: {
    id: 'toolNavBar.vocabulary',
    defaultMessage: 'Term Lists',
  },
});

const renderLinkItem = (basename, tab, isSelected) => (
  <li key={tab} role="presentation">
    <NavLink
      to={`${basename}/${tab}`}
      className={itemStyles.common}
      activeClassName={itemStyles.active}
      aria-current={null}
      aria-selected={isSelected}
      role="tab"
    >
      <FormattedMessage {...messages[tab]} />
    </NavLink>
  </li>
);

const propTypes = {
  basename: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.string),
};

export default function ToolNavBar(props) {
  const {
    basename,
    tabs,
  } = props;

  const match = useRouteMatch(`${basename}/:tab`);
  const selectedTab = match && match.params.tab;

  const items = tabs.map((tab) => renderLinkItem(basename, tab, tab === selectedTab));

  return (
    <nav className={styles.common}>
      <ul role="tablist">
        {items}
      </ul>
    </nav>
  );
}

ToolNavBar.propTypes = propTypes;
