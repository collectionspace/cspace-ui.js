import React from 'react';
import { defineMessages, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/RemoveConditionButton.css';

const { MiniButton } = inputComponents;

const messages = defineMessages({
  remove: {
    id: 'removeConditionButton.remove',
    description: 'Label of the button to remove a search condition.',
    defaultMessage: 'Remove search condition',
  },
});

const contextTypes = {
  intl: intlShape,
};

export default function RemoveConditionButton(props, context) {
  const { intl } = context;

  return (
    <MiniButton
      aria-label={intl.formatMessage(messages.remove)}
      className={styles.common}
      {...props}
    >
      −
    </MiniButton>
  );
}

RemoveConditionButton.contextTypes = contextTypes;
