import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import { Modal } from 'cspace-layout';
import CancelButton from '../record/CancelButton';
import RunButton from '../record/RunButton';
import runButtonStyles from '../../../styles/cspace-ui/RunBatchButton.css';

const messages = defineMessages({
  prompt: {
    id: 'batchModal.prompt',
    description: 'The prompt shown to run a batch jbob.',
    defaultMessage: 'Run this batch job?',
  },
  cancel: {
    id: 'batchModal.cancel',
    description: 'Label of the cancel button in the batch job modal.',
    defaultMessage: 'Cancel',
  },
  run: {
    id: 'batchModal.run',
    description: 'Label of the save button in the batch job modal.',
    defaultMessage: 'Run',
  },
});

const propTypes = {
  isOpen: PropTypes.bool,
  isRunning: PropTypes.bool,
  batchItem: PropTypes.instanceOf(Immutable.Map),
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onRunButtonClick: PropTypes.func,
};

export default class BatchModal extends Component {
  constructor() {
    super();

    this.renderButtonBar = this.renderButtonBar.bind(this);
  }

  renderButtonBar() {
    const {
      isRunning,
      onCancelButtonClick,
      onRunButtonClick,
    } = this.props;

    return (
      <div>
        <CancelButton
          disabled={isRunning}
          label={<FormattedMessage {...messages.cancel} />}
          onClick={onCancelButtonClick}
        />
        <RunButton
          className={runButtonStyles.common}
          isRunning={isRunning}
          label={<FormattedMessage {...messages.run} />}
          onClick={onRunButtonClick}
        />
      </div>
    );
  }

  render() {
    const {
      isOpen,
      batchItem,
      onCloseButtonClick,
    } = this.props;

    if (!isOpen || !batchItem) {
      return null;
    }

    return (
      <Modal
        isOpen={isOpen}
        title={<h1>{batchItem.get('name')}</h1>}
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

BatchModal.modalName = 'BatchModal';
BatchModal.propTypes = propTypes;
