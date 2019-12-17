import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';

const { DateInput } = inputComponents;

const propTypes = {
  intl: intlShape,
};

export function IntlAwareDateInput(props) {
  const {
    intl,
    ...remainingProps
  } = props;

  const { locale } = intl;

  return (
    <DateInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...remainingProps}
      locale={locale}
    />
  );
}

IntlAwareDateInput.propTypes = propTypes;

const IntlizedDateInput = injectIntl(IntlAwareDateInput);

IntlizedDateInput.propTypes = DateInput.propTypes;

export default IntlizedDateInput;
