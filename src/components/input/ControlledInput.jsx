import React from 'react';
import { defineMessages, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { DropdownMenuInput } = inputComponents;

const messages = defineMessages({
  count: {
    id: 'controlledInput.count',
    description: 'Message displayed in the controlled input dropdown when filtering options.',
    defaultMessage: `{count, plural,
        =0 {No matches}
        one {# match}
        other {# matches}
    } found`,
  },
});

const ControlledInput = (props) => {
  const {
    intl,
    ...remainingProps
  } = props;

  const formatFilterMessage = count => intl.formatMessage(messages.count, { count });

  return (
    <DropdownMenuInput
      formatFilterMessage={formatFilterMessage}
      {...remainingProps}
    />
  );
};

ControlledInput.propTypes = {
  ...DropdownMenuInput.propTypes,
  intl: intlShape,
};

export default ControlledInput;
