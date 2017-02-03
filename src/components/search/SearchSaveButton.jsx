import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/SearchSaveButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'searchSaveButton.label',
    description: 'Label of the search save button.',
    defaultMessage: 'Save',
  },
});

export default function SearchSaveButton() {
  return (
    <Button
      className={styles.normal}
      icon
      name="save"
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}
