import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/SearchPinButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'searchPinButton.label',
    description: 'Label of the search pin button.',
    defaultMessage: 'Pin',
  },
});

export default function SearchPinButton(props) {
  return (
    <Button
      className={styles.normal}
      icon
      name="pin"
      type="button"
      {...props}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}
