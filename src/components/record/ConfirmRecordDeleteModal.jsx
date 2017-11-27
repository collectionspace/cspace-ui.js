import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Modal } from 'cspace-layout';
import CancelButton from '../record/CancelButton';
import DeleteButton from '../record/DeleteButton';

const messages = defineMessages({
  title: {
    id: 'confirmRecordDeleteModal.title',
    description: 'Title of the modal shown to confirm deletion of a record.',
    defaultMessage: 'Delete',
  },
  prompt: {
    id: 'confirmRecordDeleteModal.prompt',
    description: 'The prompt shown to confirm deletion of a record.',
    defaultMessage: 'Delete this record?',
  },
  cancel: {
    id: 'confirmRecordDeleteModal.cancel',
    description: 'Label of the cancel button in the confirm delete modal.',
    defaultMessage: 'Cancel',
  },
  delete: {
    id: 'confirmRecordDeleteModal.delete',
    description: 'Label of the save button in the confirm delete modal.',
    defaultMessage: 'Delete',
  },
});

const propTypes = {
  csid: PropTypes.string,
  isOpen: PropTypes.bool,
  isSavePending: PropTypes.bool,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
};

export default class ConfirmRecordDeleteModal extends Component {
  constructor() {
    super();

    this.renderButtonBar = this.renderButtonBar.bind(this);
  }

  renderButtonBar() {
    const {
      csid,
      isSavePending,
      onCancelButtonClick,
      onDeleteButtonClick,
    } = this.props;

    return (
      <div>
        <CancelButton
          disabled={isSavePending}
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />
        <DeleteButton
          csid={csid}
          isSavePending={isSavePending}
          label={<FormattedMessage {...messages.delete} />}
          onClick={onDeleteButtonClick}
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

ConfirmRecordDeleteModal.modalName = 'ConfirmRecordDeleteModal';
ConfirmRecordDeleteModal.propTypes = propTypes;
