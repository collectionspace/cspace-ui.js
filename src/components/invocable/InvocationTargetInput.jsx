import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import RecordSearchInput from '../search/RecordSearchInput';

const { Label } = inputComponents;

const messages = defineMessages({
  single: {
    id: 'invocationTargetInput.single',
    description: 'Label of the invocation target picker in single mode.',
    defaultMessage: 'Record',
  },
  list: {
    id: 'invocationTargetInput.list',
    description: 'Label of the invocation target picker in list mode.',
    defaultMessage: 'Records',
  },
  group: {
    id: 'invocationTargetInput.group',
    description: 'Label of the invocation target picker in group mode.',
    defaultMessage: 'Group',
  },
});

const propTypes = {
  mode: PropTypes.string.isRequired,
};

export default function InvocationTargetInput(props) {
  const {
    mode,
    ...remainingProps
  } = props;

  if (mode === 'nocontext') {
    return <div />;
  }

  return (
    <RecordSearchInput
      label={<Label><FormattedMessage {...messages[mode]} /></Label>}
      {...remainingProps}
    />
  );
}

InvocationTargetInput.propTypes = propTypes;
