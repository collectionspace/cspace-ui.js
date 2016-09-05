import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import NavBar from '../navigation/NavBar';
import UserMenu from '../user/UserMenu';
import styles from '../../styles/cspace-ui/Header.css';

export default function Header(props) {
  const {
    username,
  } = props;

  return (
    <header>
      <div className={styles.logo}>
        <Link to="/" />
      </div>

      <UserMenu username={username} />
      <NavBar />
    </header>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
