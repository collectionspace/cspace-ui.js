import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/CancelButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'cancelButton.label',
    description: 'Default label of the cancel button.',
    defaultMessage: 'Cancel',
  },
});

const propTypes = {
  label: PropTypes.node,
  onClick: PropTypes.func,
};

export default function CancelButton(props) {
  const {
    onClick,
  } = props;

  let {
    label,
  } = props;

  if (!label) {
    label = <FormattedMessage {...messages.label} />;
  }

  return (
    <Button
      className={styles.common}
      icon
      name="cancel"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

CancelButton.propTypes = propTypes;
