import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import CloneButton from './CloneButton';
import SaveButton from './SaveButton';
import RevertButton from './RevertButton';
import DeleteButton from './DeleteButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  isCloneable: PropTypes.bool,
  isDeletable: PropTypes.bool,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  readOnly: PropTypes.bool,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  onCloneButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onRevertButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  onSaveButtonErrorBadgeClick: PropTypes.func,
};

export default function RecordButtonBar(props) {
  const {
    isCloneable,
    isDeletable,
    isModified,
    isSavePending,
    readOnly,
    validationErrors,
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
        readOnly={readOnly}
        validationErrors={validationErrors}
        onClick={onSaveButtonClick}
        onErrorBadgeClick={onSaveButtonErrorBadgeClick}
      />
      <CloneButton
        isCloneable={isCloneable}
        isModified={isModified}
        isSavePending={isSavePending}
        onClick={onCloneButtonClick}
      />
      <RevertButton
        isModified={isModified}
        isSavePending={isSavePending}
        readOnly={readOnly}
        onClick={onRevertButtonClick}
      />
      <DeleteButton
        isDeletable={isDeletable}
        isSavePending={isSavePending}
        onClick={onDeleteButtonClick}
      />
    </div>
  );
}

RecordButtonBar.propTypes = propTypes;
