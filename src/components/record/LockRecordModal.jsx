import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Modal } from 'cspace-layout';
import CancelButton from '../navigation/CancelButton';
import SaveButton from './SaveButton';
import lockButtonStyles from '../../../styles/cspace-ui/LockButton.css';

const messages = defineMessages({
  title: {
    id: 'lockRecordModal.title',
    description: 'Title of the modal shown to optionally lock a record on save.',
    defaultMessage: 'Lock Record?',
  },
  prompt: {
    id: 'lockRecordModal.prompt',
    description: 'The prompt shown to optionally lock a record on save.',
    defaultMessage: 'This record may be locked after it is saved. This will make the record read-only, to prevent further modification.',
  },
  cancel: {
    id: 'lockRecordModal.cancel',
    description: 'Label of the cancel button in the lock record modal.',
    defaultMessage: 'Cancel',
  },
  saveLock: {
    id: 'lockRecordModal.saveLock',
    description: 'Label of the save and lock button in the lock record modal.',
    defaultMessage: 'Save and lock',
  },
  saveOnly: {
    id: 'lockRecordModal.saveOnly',
    description: 'Label of the save only (do not lock) button in the lock record modal.',
    defaultMessage: 'Save only',
  },
});

const propTypes = {
  csid: PropTypes.string,
  isOpen: PropTypes.bool,
  isSavePending: PropTypes.bool,
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onSaveOnlyButtonClick: PropTypes.func,
  onSaveLockButtonClick: PropTypes.func,
};

export default class LockRecordModal extends Component {
  constructor() {
    super();

    this.renderButtonBar = this.renderButtonBar.bind(this);
  }

  renderButtonBar() {
    const {
      csid,
      isSavePending,
      onCancelButtonClick,
      onSaveOnlyButtonClick,
      onSaveLockButtonClick,
    } = this.props;

    return (
      <div>
        <CancelButton
          disabled={isSavePending}
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />
        <SaveButton
          csid={csid}
          isSavePending={isSavePending}
          label={<FormattedMessage {...messages.saveOnly} />}
          onClick={onSaveOnlyButtonClick}
        />
        <SaveButton
          className={lockButtonStyles.common}
          csid={csid}
          isSavePending={isSavePending}
          label={<FormattedMessage {...messages.saveLock} />}
          onClick={onSaveLockButtonClick}
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

LockRecordModal.propTypes = propTypes;
