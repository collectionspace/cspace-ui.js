import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/RecordButtonBar.css';
import saveButtonStyles from '../../../styles/cspace-ui/SaveButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  save: {
    id: 'recordButtonBar.save',
    description: 'Label of the save button.',
    defaultMessage: 'Save',
  },
});

const propTypes = {
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  onSaveButtonClick: PropTypes.func,
};

export default function RecordButtonBar(props) {
  const {
    isModified,
    isSavePending,
    onSaveButtonClick,
  } = props;

  let className;

  if (isSavePending) {
    className = saveButtonStyles.pending;
  } else if (isModified) {
    className = saveButtonStyles.normal;
  } else {
    className = saveButtonStyles.done;
  }

  return (
    <div className={styles.common}>
      <Button
        className={className}
        disabled={isSavePending}
        icon
        name="save"
        onClick={onSaveButtonClick}
      >
        <FormattedMessage {...messages.save} />
      </Button>
    </div>
  );
}

RecordButtonBar.propTypes = propTypes;
