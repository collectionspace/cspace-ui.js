import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import Immutable from 'immutable';
import InvocationModal from '../invocable/InvocationModal';
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
  config: PropTypes.object,
  isOpen: PropTypes.bool,
  isRunning: PropTypes.bool,
  batchItem: PropTypes.instanceOf(Immutable.Map),
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onRunButtonClick: PropTypes.func,
};

export default function BatchModal(props) {
  const {
    batchItem,
    ...remainingProps
  } = props;

  return (
    <InvocationModal
      invocationItem={batchItem}
      messages={messages}
      runButtonClassName={runButtonStyles.common}
      type="batch"
      {...remainingProps}
    />
  );
}

BatchModal.propTypes = propTypes;
