import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { Modal } from 'cspace-layout';
import CancelButton from '../navigation/CancelButton';
import RunButton from '../record/RunButton';
import runButtonStyles from '../../../styles/cspace-ui/RunReportButton.css';

const messages = defineMessages({
  prompt: {
    id: 'reportModal.prompt',
    description: 'The prompt shown to run a report.',
    defaultMessage: 'Run this report?',
  },
  unsaved: {
    id: 'reportModal.unsaved',
    description: 'The message shown in the report modal when the record has unsaved changes.',
    defaultMessage: 'This record has changes that have not been saved. The report will not include any unsaved data.',
  },
  cancel: {
    id: 'reportModal.cancel',
    description: 'Label of the cancel button in the report modal.',
    defaultMessage: 'Cancel',
  },
  run: {
    id: 'reportModal.run',
    description: 'Label of the save button in the report modal.',
    defaultMessage: 'Run',
  },
});

const propTypes = {
  isOpen: PropTypes.bool,
  isRecordModified: PropTypes.bool,
  reportItem: PropTypes.instanceOf(Immutable.Map),
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onRunButtonClick: PropTypes.func,
};

export default class ReportModal extends Component {
  constructor() {
    super();

    this.renderButtonBar = this.renderButtonBar.bind(this);
  }

  renderButtonBar() {
    const {
      onCancelButtonClick,
      onRunButtonClick,
    } = this.props;

    return (
      <div>
        <CancelButton
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />
        <RunButton
          className={runButtonStyles.common}
          label={<FormattedMessage {...messages.run} />}
          onClick={onRunButtonClick}
        />
      </div>
    );
  }

  render() {
    const {
      isOpen,
      isRecordModified,
      reportItem,
      onCloseButtonClick,
    } = this.props;

    if (!isOpen || !reportItem) {
      return null;
    }

    let unsavedWarning;

    if (isRecordModified) {
      unsavedWarning = <p><FormattedMessage {...messages.unsaved} /></p>;
    }

    return (
      <Modal
        isOpen={isOpen}
        title={<h1>{reportItem.get('name')}</h1>}
        closeButtonClassName="material-icons"
        closeButtonLabel="close"
        renderButtonBar={this.renderButtonBar}
        onCloseButtonClick={onCloseButtonClick}
      >
        <FormattedMessage {...messages.prompt} />
        {unsavedWarning}
      </Modal>
    );
  }
}

ReportModal.modalName = 'ReportModal';
ReportModal.propTypes = propTypes;
