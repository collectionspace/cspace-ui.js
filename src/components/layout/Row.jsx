import React, { PropTypes } from 'react';
import styles from '../../../styles/cspace-ui/Row.css';

export default function Row(props) {
  return (
    <div className={styles.common}>
      {props.children}
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.node,
};
