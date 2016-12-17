import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { DateInput } = inputComponents;

const messages = defineMessages({
  todayButtonLabel: {
    id: 'field.date.today',
    defaultMessage: 'Today',
  },
  clearButtonLabel: {
    id: 'field.date.clear',
    defaultMessage: 'Clear',
  },
  okButtonLabel: {
    id: 'field.date.ok',
    defaultMessage: 'OK',
  },
  cancelButtonLabel: {
    id: 'field.date.cancel',
    defaultMessage: 'Cancel',
  },
});

const propTypes = {
  intl: intlShape,
};

export function IntlAwareDateInput(props) {
  const {
    intl,
    ...remainingProps
  } = props;

  const locale = intl.locale;

  return (
    <DateInput
      {...remainingProps}
      locale={locale}
      todayButtonLabel={intl.formatMessage(messages.todayButtonLabel)}
      clearButtonLabel={intl.formatMessage(messages.clearButtonLabel)}
      okButtonLabel={intl.formatMessage(messages.okButtonLabel)}
      cancelButtonLabel={intl.formatMessage(messages.cancelButtonLabel)}
    />
  );
}

IntlAwareDateInput.propTypes = propTypes;

const IntlizedDateInput = injectIntl(IntlAwareDateInput);

IntlizedDateInput.propTypes = DateInput.propTypes;

export default IntlizedDateInput;
