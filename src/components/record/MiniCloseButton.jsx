import React from 'react';
import classNames from 'classnames';
import styles from '../../../styles/cspace-ui/MiniCloseButton.css';

export default function MiniCloseButton(props) {
  const className = classNames(styles.common, 'material-icons');

  return (
    <button
      className={className}
      name="close"
      {...props}
    >
      close
    </button>
  );
}
