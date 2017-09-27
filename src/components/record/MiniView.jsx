import React from 'react';
import RecordForm from './RecordForm';
import styles from '../../../styles/cspace-ui/MiniView.css';

export default function MiniView(props) {
  const {
    ...allProps
  } = props;

  return (
    <div
      className={styles.common}
    >
      <RecordForm
        formName="mini"
        {...allProps}
      />
    </div>
  );
}
