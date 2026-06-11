import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/SavedQueriesButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'savedQueriesButton.label',
    description: 'Label of the saved queries button.',
    defaultMessage: 'My Saved Queries',
  },
});

export default function SavedQueriesButton(props) {
  return (
    <Button
      className={styles.common}
      icon
      name="savedQueries"
      type="button"
      {...props}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}
