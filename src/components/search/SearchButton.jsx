import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/SearchButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'searchButton.label',
    description: 'Label of the search button.',
    defaultMessage: 'Search',
  },
});

export default function SearchButton() {
  return (
    <Button
      className={styles.normal}
      icon
      name="search"
      type="submit"
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}
