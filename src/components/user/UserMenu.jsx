import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../styles/cspace-ui/UserMenu.css';

const messages = defineMessages({
  logout: {
    id: 'userMenu.logout',
    description: 'Log out menu option label.',
    defaultMessage: 'Sign out',
  },
});

export default function UserMenu(props) {
  const {
    username,
  } = props;

  return (
    <div className={styles.common}>
      {username} | <Link to="/logout"><FormattedMessage {...messages.logout} /></Link>
    </div>
  );
}

UserMenu.propTypes = {
  username: PropTypes.string.isRequired,
};
