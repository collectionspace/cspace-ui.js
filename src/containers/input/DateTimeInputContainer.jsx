import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { DateTimeInput } = inputComponents;

const messages = defineMessages({
  value: {
    id: 'dateTimeInputContainer.value',
    description: 'The value of a datetime field.',
    defaultMessage: '{date} {time}',
  },
});

const propTypes = {
  intl: intlShape,
};

export function IntlAwareDateTimeInput(props) {
  const {
    intl,
    ...remainingProps
  } = props;

  return (
    <DateTimeInput
      {...remainingProps}
      formatValue={(timestamp) => {
        const date = intl.formatDate(timestamp, { day: 'numeric', month: 'short', year: 'numeric' });
        const time = intl.formatTime(timestamp, { hour: 'numeric', minute: 'numeric', second: 'numeric' });

        return intl.formatMessage(messages.value, { date, time });
      }}
    />
  );
}

IntlAwareDateTimeInput.propTypes = propTypes;

const IntlizedDateTimeInput = injectIntl(IntlAwareDateTimeInput);

IntlizedDateTimeInput.propTypes = DateTimeInput.propTypes;

export default IntlizedDateTimeInput;
