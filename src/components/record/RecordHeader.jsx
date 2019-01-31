import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import RecordButtonBar from './RecordButtonBar';
import RecordFormSelector from './RecordFormSelector';
import RecordHistory from './RecordHistory';
import styles from '../../../styles/cspace-ui/RecordHeader.css';

const propTypes = {
  config: PropTypes.object,
  data: PropTypes.instanceOf(Immutable.Map),
  formName: PropTypes.string,
  isRunnable: PropTypes.bool,
  isCloneable: PropTypes.bool,
  isDeletable: PropTypes.bool,
  isDeprecatable: PropTypes.bool,
  isUndeprecatable: PropTypes.bool,
  isModified: PropTypes.bool,
  isReadPending: PropTypes.bool,
  isSavePending: PropTypes.bool,
  readOnly: PropTypes.bool,
  recordType: PropTypes.string.isRequired,
  showDeprecationButtons: PropTypes.bool,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  onCloneButtonClick: PropTypes.func,
  onCommit: PropTypes.func,
  onDeprecateButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onRevertButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  onSaveButtonErrorBadgeClick: PropTypes.func,
  onUndeprecateButtonClick: PropTypes.func,
  onRunButtonClick: PropTypes.func,
};

export default function RecordHeader(props) {
  const {
    config,
    data,
    formName,
    isCloneable,
    isDeletable,
    isRunnable,
    isDeprecatable,
    isUndeprecatable,
    isModified,
    isReadPending,
    isSavePending,
    readOnly,
    recordType,
    showDeprecationButtons,
    validationErrors,
    onCloneButtonClick,
    onCommit,
    onDeprecateButtonClick,
    onDeleteButtonClick,
    onRevertButtonClick,
    onSaveButtonClick,
    onSaveButtonErrorBadgeClick,
    onUndeprecateButtonClick,
    onRunButtonClick,
  } = props;

  return (
    <div className={styles.common}>
      <RecordButtonBar
        isRunnable={isRunnable}
        isCloneable={isCloneable}
        isDeletable={isDeletable}
        isDeprecatable={isDeprecatable}
        isUndeprecatable={isUndeprecatable}
        isModified={isModified}
        isReadPending={isReadPending}
        isSavePending={isSavePending}
        readOnly={readOnly}
        showDeprecationButtons={showDeprecationButtons}
        validationErrors={validationErrors}
        onCloneButtonClick={onCloneButtonClick}
        onDeprecateButtonClick={onDeprecateButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
        onRevertButtonClick={onRevertButtonClick}
        onSaveButtonClick={onSaveButtonClick}
        onSaveButtonErrorBadgeClick={onSaveButtonErrorBadgeClick}
        onUndeprecateButtonClick={onUndeprecateButtonClick}
        onRunButtonClick={onRunButtonClick}
      />
      <RecordFormSelector
        config={config}
        formName={formName}
        recordType={recordType}
        onCommit={onCommit}
      />
      <RecordHistory
        data={data}
        isModified={isModified}
        isSavePending={isSavePending}
      />
    </div>
  );
}

RecordHeader.propTypes = propTypes;
