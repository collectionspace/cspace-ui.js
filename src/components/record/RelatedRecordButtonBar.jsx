import React from 'react';
import PropTypes from 'prop-types';
import CreateButton from './CreateButton';
import RelateButton from './RelateButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  workflowState: PropTypes.string,
  onCreateButtonClick: PropTypes.func,
  onRelateButtonClick: PropTypes.func,
};

export default function RelatedRecordButtonBar(props) {
  const {
    workflowState,
    onCreateButtonClick,
    onRelateButtonClick,
  } = props;

  if (workflowState === 'locked') {
    return null;
  }

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
