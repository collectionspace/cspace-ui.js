import React, { PropTypes } from 'react';
import CreateButton from './CreateButton';
import RelateButton from './RelateButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  onCreateButtonClick: PropTypes.func,
  onRelateButtonClick: PropTypes.func,
};

export default function RelatedRecordButtonBar(props) {
  const {
    onCreateButtonClick,
    onRelateButtonClick,
  } = props;

  return (
    <div className={styles.common}>
      <CreateButton
        onClick={onCreateButtonClick}
      />
      <RelateButton
        onClick={onRelateButtonClick}
      />
    </div>
  );
}

RelatedRecordButtonBar.propTypes = propTypes;
