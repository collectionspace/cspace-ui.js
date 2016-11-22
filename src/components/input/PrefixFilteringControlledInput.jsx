import React from 'react';
import { defineMessages, intlShape } from 'react-intl';

import {
  baseComponents as inputComponents,
  enhancers as inputEnhancers,
} from 'cspace-input';

const PrefixFilteringDropdownMenuInput = inputEnhancers.withNormalizedOptions(
  inputComponents.PrefixFilteringDropdownMenuInput
);

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

export default function PrefixFilteringControlledInput(props) {
  const {
    intl,
    ...remainingProps
  } = props;

  const formatStatusMessage = count => intl.formatMessage(messages.count, { count });

  return (
    <PrefixFilteringDropdownMenuInput
      formatStatusMessage={formatStatusMessage}
      {...remainingProps}
    />
  );
}

PrefixFilteringControlledInput.propTypes = {
  ...PrefixFilteringDropdownMenuInput.propTypes,
  intl: intlShape,
};
