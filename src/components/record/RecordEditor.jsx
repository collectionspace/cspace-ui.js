import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';
import Immutable from 'immutable';
import get from 'lodash/get';
import Dock from '../sections/Dock';
import RecordButtonBar from './RecordButtonBar';
import RecordHeader from './RecordHeader';
import ConfirmRecordNavigationModal from './ConfirmRecordNavigationModal';
import ConfirmRecordDeleteModal from './ConfirmRecordDeleteModal';
import LockRecordModal from './LockRecordModal';
import HierarchyReparentNotifier from './HierarchyReparentNotifier';
import RecordFormContainer from '../../containers/record/RecordFormContainer';
import {
  canCreate, canDelete, canUpdate, canSoftDelete,
} from '../../helpers/permissionHelpers';
import { isRecordDeprecated, isRecordImmutable } from '../../helpers/recordDataHelpers';
import { isLocked } from '../../helpers/workflowStateHelpers';
import styles from '../../../styles/cspace-ui/RecordEditor.css';

import {
  MODAL_CONFIRM_RECORD_DELETE,
  MODAL_CONFIRM_RECORD_NAVIGATION,
  MODAL_LOCK_RECORD,
} from '../../constants/modalNames';

const propTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
    termDeprecationEnabled: PropTypes.bool,
  }),
  recordType: PropTypes.string.isRequired,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  cloneCsid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  dockTop: PropTypes.number,
  formName: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  roleNames: PropTypes.instanceOf(Immutable.List),
  subrecordData: PropTypes.instanceOf(Immutable.Map),
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  vocabularyWorkflowState: PropTypes.string,
  isModified: PropTypes.bool,
  isReadPending: PropTypes.bool,
  isSavePending: PropTypes.bool,
  isSidebarOpen: PropTypes.bool,
  isHardDelete: PropTypes.bool,
  // The workflow state of the related subject (aka primary) record when we're in a secondary tab.
  relatedSubjectWorkflowState: PropTypes.string,
  openModalName: PropTypes.string,
  checkDeletable: PropTypes.func,
  checkForRelations: PropTypes.func,
  checkForUses: PropTypes.func,
  checkForRoleUses: PropTypes.func,
  createNewRecord: PropTypes.func,
  readRecord: PropTypes.func,
  onRecordCreated: PropTypes.func,
  onRecordSaved: PropTypes.func,
  onSaveCancelled: PropTypes.func,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  deleteRecord: PropTypes.func,
  save: PropTypes.func,
  saveWithTransition: PropTypes.func,
  revert: PropTypes.func,
  clone: PropTypes.func,
  transitionRecord: PropTypes.func,
  removeNotification: PropTypes.func,
  removeValidationNotification: PropTypes.func,
  setForm: PropTypes.func,
  validateRecordData: PropTypes.func,
  onRecordReadComplete: PropTypes.func,
  onRecordDeleted: PropTypes.func,
  onRecordTransitioned: PropTypes.func,
  onRunButtonClick: PropTypes.func,
};

const defaultProps = {
  data: Immutable.Map(),
  isSidebarOpen: true,
};

export default class RecordEditor extends Component {
  constructor() {
    super();

    // Confirm delete modal button handlers.

    this.handleConfirmDeleteButtonClick = this.handleConfirmDeleteButtonClick.bind(this);

    // Confirm navigation modal button handlers.

    this.handleConfirmNavigationSaveButtonClick = (
      this.handleConfirmNavigationSaveButtonClick.bind(this)
    );

    this.handleConfirmNavigationRevertButtonClick = (
      this.handleConfirmNavigationRevertButtonClick.bind(this)
    );

    // Lock modal button handlers.

    this.handleSaveOnlyButtonClick = this.handleSaveOnlyButtonClick.bind(this);
    this.handleSaveLockButtonClick = this.handleSaveLockButtonClick.bind(this);

    // Shared modal handlers.

    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);

    // Button bar handlers.

    this.handleDeprecateButtonClick = this.handleDeprecateButtonClick.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleSaveButtonErrorBadgeClick = this.handleSaveButtonErrorBadgeClick.bind(this);
    this.handleRevertButtonClick = this.handleRevertButtonClick.bind(this);
    this.handleCloneButtonClick = this.handleCloneButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleRecordFormSelectorCommit = this.handleRecordFormSelectorCommit.bind(this);
    this.handleUndeprecateButtonClick = this.handleUndeprecateButtonClick.bind(this);
  }

  componentDidMount() {
    this.initRecord();
  }

  componentDidUpdate(prevProps) {
    const {
      recordType,
      vocabulary,
      csid,
      cloneCsid,
      data,
    } = this.props;

    const {
      recordType: prevRecordType,
      vocabulary: prevVocabulary,
      csid: prevCsid,
      cloneCsid: prevCloneCsid,
      data: prevData,
    } = prevProps;

    if (
      recordType !== prevRecordType
      || vocabulary !== prevVocabulary
      || csid !== prevCsid
      || cloneCsid !== prevCloneCsid
      // DRYD-859: Re-init when data is reset but other props stay the same.
      || (prevData.size > 0 && data.size === 0)
    ) {
      this.initRecord();
    }
  }

  componentWillUnmount() {
    const {
      removeNotification,
      removeValidationNotification,
    } = this.props;

    if (removeValidationNotification) {
      removeValidationNotification();
    }

    if (removeNotification) {
      removeNotification(HierarchyReparentNotifier.notificationID);
    }
  }

  handleModalCancelButtonClick(event) {
    const {
      closeModal,
      onSaveCancelled,
    } = this.props;

    if (closeModal) {
      event.stopPropagation();

      closeModal(false);
    }

    if (onSaveCancelled) {
      onSaveCancelled();
    }
  }

  handleUndeprecateButtonClick() {
    const {
      transitionRecord,
      onRecordTransitioned,
    } = this.props;

    const transitionName = 'undeprecate';

    if (transitionRecord) {
      transitionRecord(transitionName)
        .then(() => {
          if (onRecordTransitioned) {
            onRecordTransitioned(transitionName);
          }
        });
    }
  }

  handleDeprecateButtonClick() {
    const {
      transitionRecord,
      onRecordTransitioned,
    } = this.props;

    const transitionName = 'deprecate';

    if (transitionRecord) {
      transitionRecord(transitionName)
        .then(() => {
          if (onRecordTransitioned) {
            onRecordTransitioned(transitionName);
          }
        });
    }
  }

  handleConfirmDeleteButtonClick() {
    this.delete();
  }

  handleConfirmNavigationSaveButtonClick() {
    const {
      closeModal,
      onRecordCreated,
    } = this.props;

    // Wrap the onRecordCreated callback in a function that sets isNavigating to true. This lets
    // the callback know that we're already navigating away, so it should not do any navigation
    // of its own.

    const callback = onRecordCreated
      ? (newRecordCsid) => { onRecordCreated(newRecordCsid, true); }
      : undefined;

    const saveCalled = this.save(callback);

    if (saveCalled && closeModal) {
      closeModal(true);
    }
  }

  handleConfirmNavigationRevertButtonClick() {
    const {
      closeModal,
      revert,
    } = this.props;

    if (revert) {
      revert();
    }

    if (closeModal) {
      closeModal(true);
    }
  }

  handleCloneButtonClick() {
    const {
      clone,
      csid,
    } = this.props;

    if (clone) {
      clone(csid);
    }
  }

  handleDeleteButtonClick() {
    const {
      openModal,
    } = this.props;

    if (openModal) {
      openModal(MODAL_CONFIRM_RECORD_DELETE);
    }
  }

  handleRevertButtonClick() {
    const {
      revert,
    } = this.props;

    if (revert) {
      revert();
    }
  }

  handleSaveButtonClick() {
    const {
      onRecordCreated,
    } = this.props;

    this.save(onRecordCreated);
  }

  handleSaveButtonErrorBadgeClick() {
    const {
      validateRecordData,
    } = this.props;

    if (validateRecordData) {
      validateRecordData();
    }
  }

  handleSaveOnlyButtonClick() {
    const {
      save,
      closeModal,
      onRecordCreated,
    } = this.props;

    if (save) {
      save(onRecordCreated)
        .then(() => {
          if (closeModal) {
            closeModal(true);
          }
        });
    }
  }

  handleSaveLockButtonClick() {
    const {
      saveWithTransition,
      closeModal,
      onRecordCreated,
    } = this.props;

    if (saveWithTransition) {
      saveWithTransition('lock', onRecordCreated)
        .then(() => {
          if (closeModal) {
            closeModal(true);
          }
        });
    }
  }

  handleRecordFormSelectorCommit(path, value) {
    const {
      setForm,
    } = this.props;

    if (setForm) {
      setForm(value);
    }
  }

  initRecord() {
    const {
      csid,
      cloneCsid,
      createNewRecord,
      readRecord,
      removeValidationNotification,
      onRecordReadComplete,
    } = this.props;

    if (removeValidationNotification) {
      removeValidationNotification();
    }

    if (csid) {
      if (readRecord) {
        readRecord().then(() => {
          if (onRecordReadComplete) {
            onRecordReadComplete();
          }
        });
      }
    } else if (createNewRecord) {
      createNewRecord(cloneCsid);
    }
  }

  save(onRecordCreated) {
    const {
      config,
      data,
      recordType,
      openModal,
      save,
      saveWithTransition,
      onRecordSaved,
    } = this.props;

    const recordTypeConfig = config.recordTypes[recordType];
    const { lockOnSave } = recordTypeConfig;

    if (lockOnSave === 'prompt' && openModal) {
      openModal(MODAL_LOCK_RECORD);

      return false;
    }

    let savePromise;

    if (lockOnSave === true && saveWithTransition) {
      savePromise = saveWithTransition('lock', onRecordCreated);
    } else if (save) {
      savePromise = save(onRecordCreated);
    }

    if (savePromise) {
      savePromise.then(() => {
        if (recordTypeConfig.onRecordSaved) {
          // TODO: Pass in the post-save data (which could have been modified due to services layer
          // event handlers) instead of the pre-save data. The save action would need to resolve
          // with the data instead of a csid.
          recordTypeConfig.onRecordSaved({ data, recordEditor: this });
        }

        if (onRecordSaved) {
          onRecordSaved();
        }
      });
    }

    return true;
  }

  delete() {
    const {
      closeModal,
      isHardDelete,
      deleteRecord,
      onRecordDeleted,
      transitionRecord,
      onRecordTransitioned,
    } = this.props;

    if (isHardDelete) {
      if (deleteRecord) {
        deleteRecord()
          .then(() => {
            if (closeModal) {
              closeModal(true);
            }

            if (onRecordDeleted) {
              onRecordDeleted();
            }
          });
      }
    } else {
      const transitionName = 'delete';

      if (transitionRecord) {
        transitionRecord(transitionName)
          .then(() => {
            if (closeModal) {
              closeModal(true);
            }

            if (onRecordTransitioned) {
              onRecordTransitioned(transitionName);
            }
          });
      }
    }
  }

  renderConfirmNavigationModal() {
    const {
      isModified,
      isSavePending,
      openModalName,
      validationErrors,
    } = this.props;

    return (
      <ConfirmRecordNavigationModal
        isOpen={openModalName === MODAL_CONFIRM_RECORD_NAVIGATION}
        isModified={isModified}
        isSavePending={isSavePending}
        validationErrors={validationErrors}
        onCancelButtonClick={this.handleModalCancelButtonClick}
        onCloseButtonClick={this.handleModalCancelButtonClick}
        onSaveButtonClick={this.handleConfirmNavigationSaveButtonClick}
        onSaveButtonErrorBadgeClick={this.handleSaveButtonErrorBadgeClick}
        onRevertButtonClick={this.handleConfirmNavigationRevertButtonClick}
      />
    );
  }

  renderConfirmRecordDeleteModal() {
    const {
      config,
      csid,
      data,
      isSavePending,
      openModalName,
      recordType,
      vocabulary,
      checkForRelations,
      checkForUses,
      checkForRoleUses,
    } = this.props;

    return (
      <ConfirmRecordDeleteModal
        config={config}
        csid={csid}
        data={data}
        isOpen={openModalName === MODAL_CONFIRM_RECORD_DELETE}
        isSavePending={isSavePending}
        recordType={recordType}
        vocabulary={vocabulary}
        checkForRelations={checkForRelations}
        checkForUses={checkForUses}
        checkForRoleUses={checkForRoleUses}
        onCancelButtonClick={this.handleModalCancelButtonClick}
        onCloseButtonClick={this.handleModalCancelButtonClick}
        onDeleteButtonClick={this.handleConfirmDeleteButtonClick}
      />
    );
  }

  renderLockRecordModal() {
    const {
      config,
      csid,
      isSavePending,
      openModalName,
      recordType,
    } = this.props;

    const recordTypeConfig = config.recordTypes[recordType];
    const { lockOnSave } = recordTypeConfig;

    if (lockOnSave !== 'prompt') {
      return null;
    }

    return (
      <LockRecordModal
        csid={csid}
        isOpen={openModalName === MODAL_LOCK_RECORD}
        isSavePending={isSavePending}
        onCancelButtonClick={this.handleModalCancelButtonClick}
        onCloseButtonClick={this.handleModalCancelButtonClick}
        onSaveOnlyButtonClick={this.handleSaveOnlyButtonClick}
        onSaveLockButtonClick={this.handleSaveLockButtonClick}
      />
    );
  }

  render() {
    const {
      config,
      csid,
      data,
      dockTop,
      formName,
      isModified,
      isReadPending,
      isSavePending,
      isSidebarOpen,
      perms,
      recordType,
      relatedSubjectWorkflowState,
      roleNames,
      subrecordData,
      validationErrors,
      vocabulary,
      vocabularyWorkflowState,
      checkDeletable,
      onRunButtonClick,
    } = this.props;

    const recordTypeConfig = config.recordTypes[recordType];

    if (!data || !recordTypeConfig) {
      return null;
    }

    const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

    const selectedFormName = formName || recordTypeConfig.defaultForm || 'default';
    const relatedSubjectLocked = isLocked(relatedSubjectWorkflowState);
    const vocabularyLocked = isLocked(vocabularyWorkflowState);
    const immutable = isRecordImmutable(data);

    const readOnly = (
      isReadPending
      || immutable
      || !(csid ? canUpdate(recordType, perms) : canCreate(recordType, perms))
    );

    const isRunnable = !!onRunButtonClick;

    const isCloneable = (
      // The record must be saved.
      !!csid
      && !vocabularyLocked
      // If we're editing an object record in a secondary tab, and the primary record is locked,
      // a new cloned record would not be able to be related to the primary, so the clone
      // button should not appear.
      && !relatedSubjectLocked
      // We must have permission to create a new record of the type.
      && canCreate(recordType, perms)
      // FIXME: Prevent cloning seeded authroles, since they may contain permissions that are not
      // normally creatable via the UI. Instead of hardcoding this, should be able to configure a
      // normalizeCloneData function that will clean up cloned data for a record type, and/or
      // a cloneable function that will determine if a record is cloneable based on its data.
      && !(recordType === 'authrole' && data.getIn(['ns2:role', 'permsProtection']) === 'immutable')
    );

    const isDeletable = (
      (checkDeletable ? checkDeletable(data) : true)
      && !!csid
      && !immutable
      && !vocabularyLocked
      // Security resources don't have soft-delete, so also need to check hard delete.
      && (canSoftDelete(recordType, perms) || canDelete(recordType, perms))
    );

    const isDeprecatable = (
      !!csid
      && config.termDeprecationEnabled
      && serviceType === 'authority'
      && !isRecordDeprecated(data)
    );

    const isUndeprecatable = (
      !!csid
      && config.termDeprecationEnabled
      && serviceType === 'authority'
      && isRecordDeprecated(data)
    );

    const className = isSidebarOpen ? styles.normal : styles.full;

    return (
      <form className={className} autoComplete="off">
        <Dock
          dockTop={dockTop}
          isSidebarOpen={isSidebarOpen}
        >
          <RecordHeader
            config={config}
            data={data}
            formName={selectedFormName}
            isRunnable={isRunnable}
            isCloneable={isCloneable}
            isDeletable={isDeletable}
            isDeprecatable={isDeprecatable}
            isUndeprecatable={isUndeprecatable}
            isModified={isModified}
            isReadPending={isReadPending}
            isSavePending={isSavePending}
            readOnly={readOnly}
            recordType={recordType}
            validationErrors={validationErrors}
            onCloneButtonClick={this.handleCloneButtonClick}
            onCommit={this.handleRecordFormSelectorCommit}
            onDeprecateButtonClick={this.handleDeprecateButtonClick}
            onDeleteButtonClick={this.handleDeleteButtonClick}
            onSaveButtonClick={this.handleSaveButtonClick}
            onSaveButtonErrorBadgeClick={this.handleSaveButtonErrorBadgeClick}
            onRevertButtonClick={this.handleRevertButtonClick}
            onUndeprecateButtonClick={this.handleUndeprecateButtonClick}
            onRunButtonClick={onRunButtonClick}
          />
        </Dock>

        <RecordFormContainer
          config={config}
          csid={csid}
          data={data}
          formName={selectedFormName}
          readOnly={readOnly}
          recordType={recordType}
          recordTypeConfig={recordTypeConfig}
          roleNames={roleNames}
          subrecordData={subrecordData}
          vocabulary={vocabulary}
        />

        <footer>
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
            validationErrors={validationErrors}
            onSaveButtonClick={this.handleSaveButtonClick}
            onSaveButtonErrorBadgeClick={this.handleSaveButtonErrorBadgeClick}
            onRevertButtonClick={this.handleRevertButtonClick}
            onCloneButtonClick={this.handleCloneButtonClick}
            onDeleteButtonClick={this.handleDeleteButtonClick}
            onRunButtonClick={onRunButtonClick}
          />
        </footer>

        <Prompt
          when={isModified && !isSavePending}
          message={MODAL_CONFIRM_RECORD_NAVIGATION}
        />

        {this.renderConfirmNavigationModal()}
        {this.renderConfirmRecordDeleteModal()}
        {this.renderLockRecordModal()}
      </form>
    );
  }
}

RecordEditor.propTypes = propTypes;
RecordEditor.defaultProps = defaultProps;
