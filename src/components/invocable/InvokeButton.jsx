import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/InvokeButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'invokeButton.label',
    description: 'Label of the invoke button.',
    defaultMessage: 'Run',
  },
});

const propTypes = {
  isRunning: PropTypes.bool,
  recordType: PropTypes.string,
  onClick: PropTypes.func,
};

export default function InvokeButton(props) {
  const {
    isRunning,
    recordType,
    onClick,
  } = props;

  return (
    <Button
      className={styles[recordType]}
      disabled={isRunning}
      icon
      name="invoke"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

InvokeButton.propTypes = propTypes;
