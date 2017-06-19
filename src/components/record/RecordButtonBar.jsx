import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import CloneButton from './CloneButton';
import SaveButton from './SaveButton';
import RevertButton from './RevertButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  csid: PropTypes.string,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  onCloneButtonClick: PropTypes.func,
  onRevertButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  onSaveButtonErrorBadgeClick: PropTypes.func,
};

export default function RecordButtonBar(props) {
  const {
    csid,
    isModified,
    isSavePending,
    validationErrors,
    onCloneButtonClick,
    onRevertButtonClick,
    onSaveButtonClick,
    onSaveButtonErrorBadgeClick,
  } = props;

  return (
    <div className={styles.common}>
      <SaveButton
        isModified={isModified}
        isSavePending={isSavePending}
        validationErrors={validationErrors}
        onClick={onSaveButtonClick}
        onErrorBadgeClick={onSaveButtonErrorBadgeClick}
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
