import React, { PropTypes } from 'react';
import { Link } from 'react-router';
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
