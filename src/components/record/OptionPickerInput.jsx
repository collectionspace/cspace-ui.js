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
  ...BaseOptionPickerInput.propTypes,
  config: PropTypes.object,
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
      message,
      value,
    } = option;

    const {
      intl,
    } = this.props;

    return (message ? intl.formatMessage(message) : value);
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
      /* eslint-disable no-unused-vars */
      intl,
      /* eslint-enable no-unused-vars */
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
