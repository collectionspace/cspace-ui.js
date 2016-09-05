import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from '../../styles/cspace-ui/UserMenu.css';

export default function UserMenu(props) {
  const {
    username,
  } = props;

  return (
    <div className={styles.common}>
      {username} | <Link to="/logout">Sign out</Link>
    </div>
  );
}

UserMenu.propTypes = {
  username: PropTypes.string.isRequired,
};
