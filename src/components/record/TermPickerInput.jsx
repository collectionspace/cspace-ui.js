import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Immutable from 'immutable';
import warning from 'warning';
import { baseComponents as inputComponents, enhancers as inputEnhancers } from 'cspace-input';
import withConfig from '../../enhancers/withConfig';

const {
  labelable,
  repeatable,
} = inputEnhancers;

const BaseTermPickerInput = repeatable(labelable(inputComponents.TermPickerInput));

const messages = defineMessages({
  count: {
    id: 'termPickerInput.count',
    description: 'Message displayed in the term picker input dropdown when filtering options.',
    defaultMessage: `{count, plural,
        =0 {No matching terms}
        one {# matching term}
        other {# matching terms}
    } found`,
  },
});

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...BaseTermPickerInput.propTypes,
  config: PropTypes.shape({
    defaultDropdownFilter: PropTypes.string,
  }),
  intl: intlShape,
  name: PropTypes.string,
  perms: PropTypes.instanceOf(Immutable.Map),
  readTerms: PropTypes.func,
  source: PropTypes.string,
};

/**
 * A wrapper around TermPickerInput from cspace-input that implements some lifecycle methods,
 * applies default props from config, and supplies i18n.
 */
class TermPickerInput extends Component {
  constructor() {
    super();

    this.formatStatusMessage = this.formatStatusMessage.bind(this);
  }

  componentDidMount() {
    const {
      name,
      source,
      readTerms,
    } = this.props;

    warning(source,
      `The term picker input with name '${name}' is not associated with a term source. Set the 'source' prop.`);

    if (source && readTerms) {
      readTerms(source);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      perms,
      source,
      readTerms,
    } = this.props;

    const {
      perms: prevPerms,
    } = prevProps;

    if (readTerms && perms !== prevPerms) {
      readTerms(source);
    }
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
      perms,
      readTerms,
      source,
      ...remainingProps
    } = this.props;

    return (
      <BaseTermPickerInput
        filter={config.defaultDropdownFilter}
        formatStatusMessage={this.formatStatusMessage}
        {...remainingProps}
      />
    );
  }
}

TermPickerInput.propTypes = propTypes;

const IntlAwareTermPickerInput = injectIntl(withConfig(TermPickerInput));

IntlAwareTermPickerInput.propTypes = TermPickerInput.propTypes;

export default IntlAwareTermPickerInput;
