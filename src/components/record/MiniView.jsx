import React from 'react';
import RecordForm from './RecordForm';
import styles from '../../../styles/cspace-ui/MiniView.css';

const propTypes = {
  ...RecordForm.propTypes,
};

export default function MiniView(props) {
  const miniViewProps = Object.assign({}, props);

  delete miniViewProps.formName;

  return (
    <div
      className={styles.common}
    >
      <RecordForm
        formName="mini"
        {...miniViewProps}
      />
    </div>
  );
}

MiniView.propTypes = propTypes;
