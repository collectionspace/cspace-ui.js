import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';
import Immutable from 'immutable';
import RecordButtonBar from './RecordButtonBar';
import RecordHistory from './RecordHistory';
import ConfirmRecordNavigationModal from './ConfirmRecordNavigationModal';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordEditor.css';

function renderTemplate(component, messages, handlers) {
  const overrideProps = {};
  const type = component.type;

  if (type) {
    const propTypes = type.propTypes;

    if (propTypes) {
      Object.keys(handlers).forEach((handlerName) => {
        if (propTypes[handlerName] && !component.props[handlerName]) {
          overrideProps[handlerName] = handlers[handlerName];
        }
      });
    }
  }

  return React.cloneElement(
    component,
    overrideProps,
    React.Children.map(
      component.props.children,
      child => renderTemplate(child, messages, handlers)));
}

const propTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string.isRequired,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  cloneCsid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  openModalName: PropTypes.string,
  createNewRecord: PropTypes.func,
  readRecord: PropTypes.func,
  onAddInstance: PropTypes.func,
  onCommit: PropTypes.func,
  onMoveInstance: PropTypes.func,
  onRemoveInstance: PropTypes.func,
  onRecordCreated: PropTypes.func,
  onSaveCancelled: PropTypes.func,
  closeModal: PropTypes.func,
  save: PropTypes.func,
  revert: PropTypes.func,
  clone: PropTypes.func,
  removeValidationNotification: PropTypes.func,
  validateRecordData: PropTypes.func,
};

const defaultProps = {
  data: Immutable.Map(),
};

const childContextTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
};

export default class RecordEditor extends Component {
  constructor() {
    super();

    this.handleConfirmCancelButtonClick = this.handleConfirmCancelButtonClick.bind(this);
    this.handleConfirmSaveButtonClick = this.handleConfirmSaveButtonClick.bind(this);
    this.handleConfirmRevertButtonClick = this.handleConfirmRevertButtonClick.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleSaveButtonErrorBadgeClick = this.handleSaveButtonErrorBadgeClick.bind(this);
    this.handleRevertButtonClick = this.handleRevertButtonClick.bind(this);
    this.handleCloneButtonClick = this.handleCloneButtonClick.bind(this);
  }

  getChildContext() {
    const {
      config,
      csid,
      recordType,
      vocabulary,
    } = this.props;

    return {
      config,
      csid,
      recordType,
      vocabulary,
    };
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

  handleConfirmCancelButtonClick() {
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

  handleConfirmSaveButtonClick() {
    const {
      closeModal,
      save,
      onRecordCreated,
    } = this.props;

    if (save) {
      // Wrap the onRecordCreated callback in a HOF that sets isNavigating to true. This lets the
      // callback know that we're already navigating away, so it should not do any navigation of
      // its own.

      const callback = onRecordCreated
        ? (newRecordCsid) => { onRecordCreated(newRecordCsid, true); }
        : undefined;

      save(callback);
    }

    if (closeModal) {
      closeModal(true);
    }
  }

  handleConfirmRevertButtonClick() {
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

  render() {
    const {
      config,
      csid,
      data,
      isModified,
      isSavePending,
      openModalName,
      recordType,
      validationErrors,
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
    } = this.props;

    const recordTypeConfig = config.recordTypes[recordType];

    if (!recordTypeConfig) {
      return null;
    }

    const {
      forms,
      messages,
    } = recordTypeConfig;

    const handlers = {
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
    };

    const formTemplate = forms.default;

    const formContent = React.cloneElement(formTemplate, {
      name: DOCUMENT_PROPERTY_NAME,
      value: data.get(DOCUMENT_PROPERTY_NAME),
      children: React.Children.map(
        formTemplate.props.children,
        child => renderTemplate(child, messages, handlers)),
    });

    return (
      <form
        autoComplete="off"
        className={styles.common}
      >
        <header>
          <RecordButtonBar
            csid={csid}
            isModified={isModified}
            isSavePending={isSavePending}
            validationErrors={validationErrors}
            onSaveButtonClick={this.handleSaveButtonClick}
            onSaveButtonErrorBadgeClick={this.handleSaveButtonErrorBadgeClick}
            onRevertButtonClick={this.handleRevertButtonClick}
            onCloneButtonClick={this.handleCloneButtonClick}
          />
          <RecordHistory
            data={data}
            isModified={isModified}
            isSavePending={isSavePending}
          />
        </header>
        {formContent}
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
          />
        </footer>
        <Prompt when={isModified && !isSavePending} message={ConfirmRecordNavigationModal.name} />
        <ConfirmRecordNavigationModal
          isOpen={openModalName === ConfirmRecordNavigationModal.name}
          isModified={isModified}
          isSavePending={isSavePending}
          validationErrors={validationErrors}
          onCancelButtonClick={this.handleConfirmCancelButtonClick}
          onCloseButtonClick={this.handleConfirmCancelButtonClick}
          onSaveButtonClick={this.handleConfirmSaveButtonClick}
          onSaveButtonErrorBadgeClick={this.handleSaveButtonErrorBadgeClick}
          onRevertButtonClick={this.handleConfirmRevertButtonClick}
        />
      </form>
    );
  }
}

RecordEditor.propTypes = propTypes;
RecordEditor.defaultProps = defaultProps;
RecordEditor.childContextTypes = childContextTypes;

