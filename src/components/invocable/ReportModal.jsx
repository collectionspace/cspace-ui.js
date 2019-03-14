import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import Immutable from 'immutable';
import InvocationModal from '../invocable/InvocationModal';
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
  config: PropTypes.object,
  isOpen: PropTypes.bool,
  isRecordModified: PropTypes.bool,
  reportItem: PropTypes.instanceOf(Immutable.Map),
  onCancelButtonClick: PropTypes.func,
  onCloseButtonClick: PropTypes.func,
  onRunButtonClick: PropTypes.func,
};

export default function ReportModal(props) {
  const {
    reportItem,
    ...remainingProps
  } = props;

  return (
    <InvocationModal
      invocationItem={reportItem}
      messages={messages}
      runButtonClassName={runButtonStyles.common}
      type="report"
      {...remainingProps}
    />
  );
}

ReportModal.propTypes = propTypes;
ReportModal.modalName = 'ReportModal';
