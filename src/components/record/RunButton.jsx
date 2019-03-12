import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'runButton.label',
    description: 'Label of the run button.',
    defaultMessage: 'Run',
  },
});

const propTypes = {
  className: PropTypes.string,
  isRunning: PropTypes.bool,
  onClick: PropTypes.func,
  isRunnable: PropTypes.bool,
};

export default function RunButton(props) {
  const {
    className,
    isRunning,
    onClick,
    isRunnable,
  } = props;

  if (!isRunnable) {
    return null;
  }

  return (
    <Button
      className={className}
      disabled={isRunning}
      icon
      name="run"
      onClick={onClick}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

RunButton.propTypes = propTypes;
