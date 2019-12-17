import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import withConfig from '../../enhancers/withConfig';

const { OptionPickerInput: BaseOptionPickerInput } = inputComponents;

const messages = defineMessages({
  count: {
    id: 'optionPickerInput.count',
    description: 'Message displayed in the option picker input dropdown when filtering options.',
    defaultMessage: `{count, plural,
        =0 {No matching options}
        one {# matching option}
        other {# matching options}
    } found`,
  },
});

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...BaseOptionPickerInput.propTypes,
  config: PropTypes.shape({
    defaultDropdownFilter: PropTypes.string,
  }),
  intl: intlShape,
};

/**
 * A wrapper around OptionPickerInput from cspace-input that applies default props from config, and
 * supplies i18n.
 */
class OptionPickerInput extends Component {
  constructor() {
    super();

    this.formatOptionLabel = this.formatOptionLabel.bind(this);
    this.formatStatusMessage = this.formatStatusMessage.bind(this);
  }

  formatOptionLabel(option) {
    const {
      labelFormatter,
      message,
      value,
    } = option;

    const {
      intl,
    } = this.props;

    if (labelFormatter) {
      return labelFormatter(intl, option);
    }

    if (message) {
      return intl.formatMessage(message);
    }

    return value;
  }

  formatStatusMessage(count) {
    const {
      intl,
    } = this.props;

    return intl.formatMessage(messages.count, { count });
  }

  render() {
    const {
      config,
      intl,
      ...remainingProps
    } = this.props;

    return (
      <BaseOptionPickerInput
        filter={config.defaultDropdownFilter}
        formatOptionLabel={this.formatOptionLabel}
        formatStatusMessage={this.formatStatusMessage}
        {...remainingProps}
      />
    );
  }
}

OptionPickerInput.propTypes = propTypes;

const IntlAwareOptionPickerInput = injectIntl(withConfig(OptionPickerInput));

IntlAwareOptionPickerInput.propTypes = OptionPickerInput.propTypes;

export default IntlAwareOptionPickerInput;
