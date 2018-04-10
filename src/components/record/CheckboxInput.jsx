import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { baseComponents as inputComponents, enhancers as inputEnhancers } from 'cspace-input';

const {
  labelable,
} = inputEnhancers;

const BaseCheckboxInput = labelable(inputComponents.CheckboxInput);

const messages = defineMessages({
  true: {
    id: 'checkboxInput.true',
    description: 'The textual label of a true (checked) value in a checkbox input. Used when search criteria are displayed in search results, for fields that were rendered as checkboxes on the search form.',
    defaultMessage: 'yes',
  },
  false: {
    id: 'checkboxInput.false',
    description: 'The textual label of a false (unchecked) value in a checkbox input. Used when search criteria are displayed in search results, for fields that were rendered as checkboxes on the search form.',
    defaultMessage: 'no',
  },
  indeterminate: {
    id: 'checkboxInput.indeterminate',
    description: 'The textual label of an indeterminate value in a checkbox input. Currently not used anywhere, but may be in the future.',
    defaultMessage: 'indeterminate',
  },
});

const propTypes = {
  ...BaseCheckboxInput.propTypes,
  intl: intlShape,
  viewType: PropTypes.string,
  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string,
  indeterminateLabel: PropTypes.string,
};

/*
 * A wrapper around a cspace-input CheckboxInput that supplies i18n and alternate transitions
 * when displayed in a search form.
 */
function CheckboxInput(props) {
  const {
    intl,
    viewType,
    trueLabel = intl.formatMessage(messages.true),
    falseLabel = intl.formatMessage(messages.false),
    indeterminateLabel = intl.formatMessage(messages.indeterminate),
    ...remainingProps
  } = props;

  let transition;

  if (viewType === 'search') {
    // When searching, the indeterminate value should be togglable.

    transition = {
      null: true,
      true: false,
      false: null,
    };
  }

  return (
    <BaseCheckboxInput
      trueLabel={trueLabel}
      falseLabel={falseLabel}
      indeterminateLabel={indeterminateLabel}
      transition={transition}
      {...remainingProps}
    />
  );
}

CheckboxInput.propTypes = propTypes;

const IntlAwareCheckboxInput = injectIntl(CheckboxInput);

IntlAwareCheckboxInput.propTypes = CheckboxInput.propTypes;

export default IntlAwareCheckboxInput;
