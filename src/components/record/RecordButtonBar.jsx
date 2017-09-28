import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import CloneButton from './CloneButton';
import SaveButton from './SaveButton';
import RevertButton from './RevertButton';
import DeleteButton from './DeleteButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  csid: PropTypes.string,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  relatedSubjectWorkflowState: PropTypes.string,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  workflowState: PropTypes.string,
  onCloneButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onRevertButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  onSaveButtonErrorBadgeClick: PropTypes.func,
};

export default function RecordButtonBar(props) {
  const {
    csid,
    isModified,
    isSavePending,
    relatedSubjectWorkflowState,
    validationErrors,
    workflowState,
    onCloneButtonClick,
    onDeleteButtonClick,
    onRevertButtonClick,
    onSaveButtonClick,
    onSaveButtonErrorBadgeClick,
  } = props;

  return (
    <div className={styles.common}>
      <SaveButton
        isModified={isModified}
        isSavePending={isSavePending}
        workflowState={workflowState}
        validationErrors={validationErrors}
        onClick={onSaveButtonClick}
        onErrorBadgeClick={onSaveButtonErrorBadgeClick}
      />
      <CloneButton
        csid={csid}
        isModified={isModified}
        isSavePending={isSavePending}
        relatedSubjectWorkflowState={relatedSubjectWorkflowState}
        onClick={onCloneButtonClick}
      />
      <RevertButton
        isModified={isModified}
        isSavePending={isSavePending}
        workflowState={workflowState}
        onClick={onRevertButtonClick}
      />
      <DeleteButton
        csid={csid}
        isSavePending={isSavePending}
        workflowState={workflowState}
        onClick={onDeleteButtonClick}
      />
    </div>
  );
}

RecordButtonBar.propTypes = propTypes;
