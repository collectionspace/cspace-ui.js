import React, { PropTypes } from 'react';
import CreateButton from './CreateButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  onCreateButtonClick: PropTypes.func,
};

export default function RelatedRecordButtonBar(props) {
  const {
    onCreateButtonClick,
  } = props;

  return (
    <div className={styles.common}>
      <CreateButton
        onClick={onCreateButtonClick}
      />
    </div>
  );
}

RelatedRecordButtonBar.propTypes = propTypes;
