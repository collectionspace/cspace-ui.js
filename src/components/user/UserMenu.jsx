import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../styles/cspace-ui/UserMenu.css';

const messages = defineMessages({
  logout: {
    id: 'userMenu.logout',
    description: 'Log out menu option label.',
    defaultMessage: 'Sign out',
  },
});

const propTypes = {
  screenName: PropTypes.string.isRequired,
};

export default function UserMenu(props) {
  const {
    screenName,
  } = props;

  return (
    <div className={styles.common}>
      {screenName}
      {' '}
      |
      <Link to="/logout"><FormattedMessage {...messages.logout} /></Link>
    </div>
  );
}

UserMenu.propTypes = propTypes;
