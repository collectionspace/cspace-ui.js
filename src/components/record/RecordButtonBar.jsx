import React, { PropTypes } from 'react';
import CloneButton from './CloneButton';
import SaveButton from './SaveButton';
import RevertButton from './RevertButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  csid: PropTypes.string,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  onCloneButtonClick: PropTypes.func,
  onRevertButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
};

export default function RecordButtonBar(props) {
  const {
    csid,
    isModified,
    isSavePending,
    onCloneButtonClick,
    onRevertButtonClick,
    onSaveButtonClick,
  } = props;

  return (
    <div className={styles.common}>
      <SaveButton
        isModified={isModified}
        isSavePending={isSavePending}
        onClick={onSaveButtonClick}
      />
      <CloneButton
        csid={csid}
        isModified={isModified}
        isSavePending={isSavePending}
        onClick={onCloneButtonClick}
      />
      <RevertButton
        isModified={isModified}
        isSavePending={isSavePending}
        onClick={onRevertButtonClick}
      />
    </div>
  );
}

RecordButtonBar.propTypes = propTypes;
