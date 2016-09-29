import React, { PropTypes } from 'react';
import styles from '../../../styles/cspace-ui/Panel.css';

export default function Panel(props) {
  return (
    <div className={styles.common}>
      {props.children}
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.node,
};
