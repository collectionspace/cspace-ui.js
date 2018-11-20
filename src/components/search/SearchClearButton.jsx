import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/SearchClearButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'searchClearButton.label',
    description: 'Label of the search clear button.',
    defaultMessage: 'Clear',
  },
});

export default function SearchClearButton(props) {
  return (
    <Button
      className={styles.common}
      icon
      name="clear"
      type="button"
      {...props}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}
