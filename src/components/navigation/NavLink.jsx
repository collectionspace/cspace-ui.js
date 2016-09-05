import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from '../../styles/cspace-ui/NavLink.css';

export default function NavLink(props) {
  const {
    to,
    children,
  } = props;

  return (
    <Link
      to={to}
      className={styles.normal}
      activeClassName={styles.active}
    >
      <div>{children}</div>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};
