import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/RecordButtonBar.css';

const { Button } = inputComponents;

const messages = defineMessages({
  save: {
    id: 'recordButtonBar.save',
    description: 'Label of the save button.',
    defaultMessage: 'Save',
  },
});

export default function RecordButtonBar(props) {
  const {
    isSavePending,
    onSaveButtonClick,
  } = props;

  return (
    <div className={styles.common}>
      <Button
        disabled={isSavePending}
        name="save"
        onClick={onSaveButtonClick}
      >
        <FormattedMessage {...messages.save} />
      </Button>
      <span>{props.isSavePending ? '  Saving...' : ''}</span>
    </div>
  );
}

RecordButtonBar.propTypes = {
  isSavePending: PropTypes.bool,
  onSaveButtonClick: PropTypes.func,
};
