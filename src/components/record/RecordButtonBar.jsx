import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import CloneButton from './CloneButton';
import DeleteButton from './DeleteButton';
import DeprecateButton from './DeprecateButton';
import SaveButton from './SaveButton';
import RevertButton from './RevertButton';
import UndeprecateButton from './UndeprecateButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';
import RunButton from './RunButton';

const propTypes = {
  isRunnable: PropTypes.bool,
  isCloneable: PropTypes.bool,
  isDeletable: PropTypes.bool,
  isDeprecatable: PropTypes.bool,
  isUndeprecatable: PropTypes.bool,
  isModified: PropTypes.bool,
  isReadPending: PropTypes.bool,
  isSavePending: PropTypes.bool,
  readOnly: PropTypes.bool,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  onUndeprecateButtonClick: PropTypes.func,
  onCloneButtonClick: PropTypes.func,
  onDeprecateButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onRevertButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  onSaveButtonErrorBadgeClick: PropTypes.func,
  onRunButtonClick: PropTypes.func,
};

export default function RecordButtonBar(props) {
  const {
    isRunnable,
    isCloneable,
    isDeletable,
    isDeprecatable,
    isUndeprecatable,
    isModified,
    isReadPending,
    isSavePending,
    readOnly,
    validationErrors,
    onUndeprecateButtonClick,
    onCloneButtonClick,
    onDeprecateButtonClick,
    onDeleteButtonClick,
    onRevertButtonClick,
    onSaveButtonClick,
    onSaveButtonErrorBadgeClick,
    onRunButtonClick,
  } = props;

  const className = isReadPending ? styles.loading : styles.common;

  return (
    <div className={className}>
      <RunButton
        // className={}
        isRunnable={isRunnable}
        isRunning={false} // FIX ME: Currently hard coded
        onClick={onRunButtonClick}
      />
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
      <DeprecateButton
        isDeprecatable={isDeprecatable}
        isModified={isModified}
        isSavePending={isSavePending}
        readOnly={readOnly}
        onClick={onDeprecateButtonClick}
      />
      <UndeprecateButton
        isUndeprecatable={isUndeprecatable}
        isModified={isModified}
        isSavePending={isSavePending}
        readOnly={readOnly}
        onClick={onUndeprecateButtonClick}
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
