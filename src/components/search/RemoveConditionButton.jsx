import React from 'react';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/RemoveConditionButton.css';

const { MiniButton } = inputComponents;

export default function RemoveConditionButton(props) {
  return (
    <MiniButton
      className={styles.common}
      {...props}
    >
      −
    </MiniButton>
  );
}
