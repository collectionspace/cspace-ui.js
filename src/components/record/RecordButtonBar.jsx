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

  return (
    <div className={styles.common}>
      <Button
        className={isModified ? saveButtonStyles.normal : saveButtonStyles.done}
        disabled={isSavePending}
        icon
        name="save"
        onClick={onSaveButtonClick}
      >
        <FormattedMessage {...messages.save} />
      </Button>
      <span>{props.isSavePending ? '  Saving...' : ''}</span>
    </div>
  );
}

RecordButtonBar.propTypes = propTypes;
