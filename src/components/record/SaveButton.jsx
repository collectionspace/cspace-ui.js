import React, { PropTypes } from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/SaveButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'saveButton.label',
    description: 'Label of the save button.',
    defaultMessage: 'Save',
  },
});

const propTypes = {
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  save: PropTypes.func,
};

export default function SaveButton(props) {
  const {
    isModified,
    isSavePending,
    save,
  } = props;

  let className;

  if (isSavePending) {
    className = styles.pending;
  } else if (isModified) {
    className = styles.normal;
  } else {
    className = styles.done;
  }

  return (
    <Button
      className={className}
      disabled={isSavePending}
      icon
      name="save"
      onClick={save}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

SaveButton.propTypes = propTypes;
