import React, { PropTypes } from 'react';
import styles from '../../styles/cspace-ui/RootPage.css';

export default function RootPage(props) {
  const {
    children,
  } = props;

  return (
    <div className={styles.common}>
      {children}
    </div>
  );
}

RootPage.propTypes = {
  children: PropTypes.node,
};
