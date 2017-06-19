import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../../../styles/cspace-ui/BackLink.css';

const propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};

export default function BackLink(props) {
  const {
    to,
    children,
  } = props;

  return (
    <Link className={styles.common} to={to}>
      {children}
    </Link>
  );
}

BackLink.propTypes = propTypes;
