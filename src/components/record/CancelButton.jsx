import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/CancelButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'cancelButton.label',
    description: 'Label of the cancel button.',
    defaultMessage: 'Cancel',
  },
});

const propTypes = {
  onClick: PropTypes.func,
};

export default function CancelButton(props) {
  const {
    onClick,
  } = props;

  return (
    <Button
      className={styles.common}
      icon
      name="cancel"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

CancelButton.propTypes = propTypes;
