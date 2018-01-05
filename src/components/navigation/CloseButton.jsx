import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/CloseButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'closeButton.label',
    description: 'Label of the close button.',
    defaultMessage: 'Close',
  },
});

const propTypes = {
  onClick: PropTypes.func,
};

export default function CloseButton(props) {
  const {
    onClick,
  } = props;

  return (
    <Button
      className={styles.common}
      icon
      name="close"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

CloseButton.propTypes = propTypes;
