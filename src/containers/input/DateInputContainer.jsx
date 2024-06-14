import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { DateInput } = inputComponents;

const propTypes = {
  intl: intlShape,
};

const messages = defineMessages({
  tooltip: {
    id: 'dateInput.tooltip',
    description: 'Tip to display for interacting with the DateInput',
    defaultMessage: 'Use the down arrow key or mouse to open the calendar',
  },
});

export function IntlAwareDateInput(props) {
  const {
    intl,
    ...remainingProps
  } = props;

  const { locale } = intl;
  const tooltip = intl.formatMessage(messages.tooltip);

  return (
    <DateInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...remainingProps}
      locale={locale}
      tooltip={tooltip}
    />
  );
}

IntlAwareDateInput.propTypes = propTypes;

const IntlizedDateInput = injectIntl(IntlAwareDateInput);

IntlizedDateInput.propTypes = DateInput.propTypes;

export default IntlizedDateInput;
