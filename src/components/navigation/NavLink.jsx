import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as BaseNavLink } from 'react-router-dom';
import styles from '../../../styles/cspace-ui/NavLink.css';

export default function NavLink(props) {
  const {
    to,
    children,
  } = props;

  return (
    <BaseNavLink
      to={to}
      className={styles.normal}
      activeClassName={styles.active}
    >
      <div>{children}</div>
    </BaseNavLink>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
};
