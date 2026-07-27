import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/PinnedQueriesButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'pinnedQueriesButton.label',
    description: 'Label of the pinned queries button.',
    defaultMessage: 'Pinned Queries',
  },
});

export default function PinnedQueriesButton(props) {
  return (
    <Button
      className={styles.common}
      icon
      name="pinnedQueries"
      type="button"
      {...props}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}
