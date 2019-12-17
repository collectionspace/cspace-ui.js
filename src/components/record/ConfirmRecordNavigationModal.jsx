import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Modal } from 'cspace-layout';
import CancelButton from '../navigation/CancelButton';
import SaveButton from './SaveButton';
import RevertButton from './RevertButton';

const messages = defineMessages({
  title: {
    id: 'confirmRecordNavigationModal.title',
    description: 'Title of the modal shown to confirm navigation away from a record that has unsaved changes.',
    defaultMessage: 'Leave Record?',
  },
  prompt: {
    id: 'confirmRecordNavigationModal.prompt',
    description: 'The prompt shown to confirm navigation away from a record that has unsaved changes.',
    defaultMessage: 'You\'re about to leave a record that has unsaved changes.',
  },
  cancel: {
    id: 'confirmRecordNavigationModal.cancel',
    description: 'Label of the cancel button in the confirm navigation modal.',
    defaultMessage: 'Don\'t leave',
  },
  save: {
    id: 'confirmRecordNavigationModal.save',
    description: 'Label of the save button in the confirm navigation modal.',
    defaultMessage: 'Save and continue',
  },
  revert: {
    id: 'confirmRecordNavigationModal.revert',
    description: 'Label of the revert button in the confirm navigation modal.',
    defaultMessage: 'Revert and continue',
  },
});

const propTypes = {
  isOpen: PropTypes.bool,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onRevertButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  onSaveButtonErrorBadgeClick: PropTypes.func,
};

export default class ConfirmRecordNavigationModal extends Component {
  constructor() {
    super();

    this.renderButtonBar = this.renderButtonBar.bind(this);
  }

  renderButtonBar() {
    const {
      isModified,
      isSavePending,
      validationErrors,
      onCancelButtonClick,
      onSaveButtonClick,
      onSaveButtonErrorBadgeClick,
      onRevertButtonClick,
    } = this.props;

    return (
      <div>
        <CancelButton
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />
        <SaveButton
          isModified={isModified}
          isSavePending={isSavePending}
          label={<FormattedMessage {...messages.save} />}
          validationErrors={validationErrors}
          onClick={onSaveButtonClick}
          onErrorBadgeClick={onSaveButtonErrorBadgeClick}
        />
        <RevertButton
          isModified={isModified}
          isSavePending={isSavePending}
          label={<FormattedMessage {...messages.revert} />}
          onClick={onRevertButtonClick}
        />
      </div>
    );
  }

  render() {
    const {
      isOpen,
      onCloseButtonClick,
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        title={<h1><FormattedMessage {...messages.title} /></h1>}
        closeButtonClassName="material-icons"
        closeButtonLabel="close"
        renderButtonBar={this.renderButtonBar}
        onCloseButtonClick={onCloseButtonClick}
      >
        <FormattedMessage {...messages.prompt} />
      </Modal>
    );
  }
}

ConfirmRecordNavigationModal.propTypes = propTypes;
