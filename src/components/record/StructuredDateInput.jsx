import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { baseComponents as inputComponents, enhancers as inputEnhancers } from 'cspace-input';
import Immutable from 'immutable';

const {
  labelable,
  repeatable,
} = inputEnhancers;

const BaseStructuredDateInput = repeatable(labelable(inputComponents.StructuredDateInput));

const fieldMessages = defineMessages({
  earliestSingle: {
    id: 'field.structuredDate.earliestSingle',
    defaultMessage: 'Earliest/Single',
  },
  latest: {
    id: 'field.structuredDate.latest',
    defaultMessage: 'Latest',
  },
  datePeriod: {
    id: 'field.structuredDate.datePeriod',
    defaultMessage: 'Period',
  },
  dateAssociation: {
    id: 'field.structuredDate.dateAssociation',
    defaultMessage: 'Association',
  },
  dateNote: {
    id: 'field.structuredDate.dateNote',
    defaultMessage: 'Note',
  },
  dateYear: {
    id: 'field.structuredDate.dateYear',
    defaultMessage: 'Year',
  },
  dateMonth: {
    id: 'field.structuredDate.dateMonth',
    defaultMessage: 'Month',
  },
  dateDay: {
    id: 'field.structuredDate.dateDay',
    defaultMessage: 'Day',
  },
  dateEra: {
    id: 'field.structuredDate.dateEra',
    defaultMessage: 'Era',
  },
  dateCertainty: {
    id: 'field.structuredDate.dateCertainty',
    defaultMessage: 'Certainty',
  },
  dateQualifier: {
    id: 'field.structuredDate.dateQualifier',
    defaultMessage: 'Qualifier',
  },
  dateQualifierValue: {
    id: 'field.structuredDate.dateQualifierValue',
    defaultMessage: 'Value',
  },
  dateQualifierUnit: {
    id: 'field.structuredDate.dateQualifierUnit',
    defaultMessage: 'Unit',
  },
});

const messages = defineMessages({
  parseFailed: {
    id: 'structuredDateInput.parseFailed',
    defaultMessage: 'Unrecognized display date format. Try a different format, or enter values in the fields below.',
  },
});

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...BaseStructuredDateInput.propTypes,
  config: PropTypes.shape({
    structDateVocabNames: PropTypes.arrayOf(PropTypes.string),
  }),
  intl: intlShape,
  perms: PropTypes.instanceOf(Immutable.Map),
  readTerms: PropTypes.func,
  structDateVocabNames: PropTypes.arrayOf(PropTypes.string),
};

class StructuredDateInput extends Component {
  constructor() {
    super();

    this.formatFieldLabel = this.formatFieldLabel.bind(this);
    this.formatOptionLabel = this.formatOptionLabel.bind(this);
    this.formatParseFailedMessage = this.formatParseFailedMessage.bind(this);
  }

  componentDidMount() {
    const {
      config,
      readTerms,
      structDateVocabNames: propStructDateVocabNames,
    } = this.props;

    if (readTerms) {
      const structDateVocabNames = propStructDateVocabNames || config.structDateVocabNames;

      structDateVocabNames.forEach((vocabName) => {
        readTerms(vocabName);
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      config,
      perms,
      readTerms,
      structDateVocabNames: propStructDateVocabNames,
    } = this.props;

    const {
      perms: prevPerms,
    } = prevProps;

    if (readTerms && perms !== prevPerms) {
      const structDateVocabNames = propStructDateVocabNames || config.structDateVocabNames;

      structDateVocabNames.forEach((vocabName) => {
        readTerms(vocabName);
      });
    }
  }

  formatFieldLabel(name) {
    const {
      intl,
    } = this.props;

    return intl.formatMessage(fieldMessages[name]);
  }

  formatOptionLabel(option) {
    const {
      intl,
    } = this.props;

    return (option.message ? intl.formatMessage(option.message) : option.value);
  }

  formatParseFailedMessage() {
    const {
      intl,
    } = this.props;

    return intl.formatMessage(messages.parseFailed);
  }

  render() {
    const {
      config,
      intl,
      perms,
      readTerms,
      structDateVocabNames,
      ...remainingProps
    } = this.props;

    return (
      <BaseStructuredDateInput
        defaultValue={Immutable.Map()}
        formatFieldLabel={this.formatFieldLabel}
        formatOptionLabel={this.formatOptionLabel}
        formatParseFailedMessage={this.formatParseFailedMessage}
        {...remainingProps}
      />
    );
  }
}

StructuredDateInput.propTypes = propTypes;

const IntlAwareStructuredDateInput = injectIntl(StructuredDateInput);

IntlAwareStructuredDateInput.propTypes = StructuredDateInput.propTypes;

export default IntlAwareStructuredDateInput;
