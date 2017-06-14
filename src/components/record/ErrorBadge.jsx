import React from 'react';
import errorIcon from '../../../images/error.svg';
import styles from '../../../styles/cspace-ui/Badge.css';

export default function ErrorBadge(props) {
  return (
    <button
      {...props}
      className={styles.common}
      type="button"
    >
      <img alt="!" src={errorIcon} />
    </button>
  );
}
