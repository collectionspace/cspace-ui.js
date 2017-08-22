import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';
import Immutable from 'immutable';
import RecordButtonBar from './RecordButtonBar';
import RecordHeader from './RecordHeader';
import ConfirmRecordNavigationModal from './ConfirmRecordNavigationModal';
import ConfirmRecordDeleteModal from './ConfirmRecordDeleteModal';
import RecordFormContainer from '../../containers/record/RecordFormContainer';
import styles from '../../../styles/cspace-ui/RecordEditor.css';

const propTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string.isRequired,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  cloneCsid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  formName: PropTypes.string,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  openModalName: PropTypes.string,
  createNewRecord: PropTypes.func,
  readRecord: PropTypes.func,
  onRecordCreated: PropTypes.func,
  onSaveCancelled: PropTypes.func,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  save: PropTypes.func,
  revert: PropTypes.func,
  clone: PropTypes.func,
  transitionRecord: PropTypes.func,
  removeValidationNotification: PropTypes.func,
  setForm: PropTypes.func,
  validateRecordData: PropTypes.func,
  onRecordTransitioned: PropTypes.func,
};

const defaultProps = {
  data: Immutable.Map(),
  formName: 'default',
};

export default class RecordEditor extends Component {
  constructor() {
    super();

    this.handleConfirmDeleteButtonClick = this.handleConfirmDeleteButtonClick.bind(this);

    this.handleConfirmNavigationSaveButtonClick =
      this.handleConfirmNavigationSaveButtonClick.bind(this);

    this.handleConfirmNavigationRevertButtonClick =
      this.handleConfirmNavigationRevertButtonClick.bind(this);

    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleSaveButtonErrorBadgeClick = this.handleSaveButtonErrorBadgeClick.bind(this);
    this.handleRevertButtonClick = this.handleRevertButtonClick.bind(this);
    this.handleCloneButtonClick = this.handleCloneButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleRecordFormSelectorCommit = this.handleRecordFormSelectorCommit.bind(this);
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
    } = this.props;

    const {
      recordType: prevRecordType,
      vocabulary: prevVocabulary,
      csid: prevCsid,
      cloneCsid: prevCloneCsid,
    } = prevProps;

    if (
      recordType !== prevRecordType ||
      vocabulary !== prevVocabulary ||
      csid !== prevCsid ||
      cloneCsid !== prevCloneCsid
    ) {
      this.initRecord();
    }
  }

  componentWillUnmount() {
    const {
      removeValidationNotification,
    } = this.props;

    if (removeValidationNotification) {
      removeValidationNotification();
    }
  }

  initRecord() {
    const {
      csid,
      cloneCsid,
      createNewRecord,
      readRecord,
      removeValidationNotification,
    } = this.props;

    if (removeValidationNotification) {
      removeValidationNotification();
    }

    if (csid) {
      if (readRecord) {
        readRecord();
      }
    } else if (createNewRecord) {
      createNewRecord(cloneCsid);
    }
  }

  handleModalCancelButtonClick() {
    const {
      closeModal,
      onSaveCancelled,
    } = this.props;

    if (closeModal) {
      closeModal(false);
    }

    if (onSaveCancelled) {
      onSaveCancelled();
    }
  }

  handleConfirmDeleteButtonClick() {
    const {
      closeModal,
      transitionRecord,
      onRecordTransitioned,
    } = this.props;

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

  handleConfirmNavigationSaveButtonClick() {
    const {
      closeModal,
      save,
      onRecordCreated,
    } = this.props;

    if (save) {
      // Wrap the onRecordCreated callback in a function that sets isNavigating to true. This lets
      // the callback know that we're already navigating away, so it should not do any navigation
      // of its own.

      const callback = onRecordCreated
        ? (newRecordCsid) => { onRecordCreated(newRecordCsid, true); }
        : undefined;

      save(callback);
    }

    if (closeModal) {
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
      openModal(ConfirmRecordDeleteModal.modalName);
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
      save,
      onRecordCreated,
    } = this.props;

    if (save) {
      save(onRecordCreated);
    }
  }

  handleSaveButtonErrorBadgeClick() {
    const {
      validateRecordData,
    } = this.props;

    if (validateRecordData) {
      validateRecordData();
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

  renderConfirmNavigationModal() {
    const {
      isModified,
      isSavePending,
      openModalName,
      validationErrors,
    } = this.props;

    return (
      <ConfirmRecordNavigationModal
        isOpen={openModalName === ConfirmRecordNavigationModal.modalName}
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
      csid,
      isSavePending,
      openModalName,
    } = this.props;

    return (
      <ConfirmRecordDeleteModal
        csid={csid}
        isOpen={openModalName === ConfirmRecordDeleteModal.modalName}
        isSavePending={isSavePending}
        onCancelButtonClick={this.handleModalCancelButtonClick}
        onCloseButtonClick={this.handleModalCancelButtonClick}
        onDeleteButtonClick={this.handleConfirmDeleteButtonClick}
      />
    );
  }

  render() {
    const {
      config,
      csid,
      data,
      formName,
      isModified,
      isSavePending,
      recordType,
      validationErrors,
    } = this.props;

    const recordTypeConfig = config.recordTypes[recordType];

    if (!recordTypeConfig) {
      return null;
    }

    return (
      <form className={styles.common} autoComplete="off">
        <RecordHeader
          csid={csid}
          isModified={isModified}
          isSavePending={isSavePending}
          validationErrors={validationErrors}
          onSaveButtonClick={this.handleSaveButtonClick}
          onSaveButtonErrorBadgeClick={this.handleSaveButtonErrorBadgeClick}
          onRevertButtonClick={this.handleRevertButtonClick}
          onCloneButtonClick={this.handleCloneButtonClick}
          onDeleteButtonClick={this.handleDeleteButtonClick}
          config={config}
          formName={formName}
          recordType={recordType}
          onCommit={this.handleRecordFormSelectorCommit}
          data={data}
        />
        <RecordFormContainer
          config={config}
          csid={csid}
          data={data}
          formName={formName}
          recordType={recordType}
        />
        <footer>
          <RecordButtonBar
            csid={csid}
            isModified={isModified}
            isSavePending={isSavePending}
            validationErrors={validationErrors}
            onSaveButtonClick={this.handleSaveButtonClick}
            onSaveButtonErrorBadgeClick={this.handleSaveButtonErrorBadgeClick}
            onRevertButtonClick={this.handleRevertButtonClick}
            onCloneButtonClick={this.handleCloneButtonClick}
            onDeleteButtonClick={this.handleDeleteButtonClick}
          />
        </footer>
        <Prompt
          when={isModified && !isSavePending}
          message={ConfirmRecordNavigationModal.modalName}
        />
        {this.renderConfirmNavigationModal()}
        {this.renderConfirmRecordDeleteModal()}
      </form>
    );
  }
}

RecordEditor.propTypes = propTypes;
RecordEditor.defaultProps = defaultProps;

