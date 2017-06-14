import React from 'react';
import PropTypes from 'prop-types';
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

const propTypes = {
  type: PropTypes.string,
};

const defaultProps = {
  type: 'submit',
};

export default function SearchButton(props) {
  const {
    type,
    ...remainingProps
  } = props;

  return (
    <Button
      className={styles.common}
      icon
      name="search"
      type={type}
      {...remainingProps}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

SearchButton.propTypes = propTypes;
SearchButton.defaultProps = defaultProps;
