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

const messages = defineMessages({
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

export const optionListNames = ['dateQualifiers'];
export const vocabNames = ['dateera', 'datecertainty', 'datequalifier'];

const propTypes = {
  ...BaseStructuredDateInput.propTypes,
  intl: intlShape,
  perms: PropTypes.instanceOf(Immutable.Map),
  readTerms: PropTypes.func,
};

class StructuredDateInput extends Component {
  constructor() {
    super();

    this.formatFieldLabel = this.formatFieldLabel.bind(this);
    this.formatOptionLabel = this.formatOptionLabel.bind(this);
  }

  componentDidMount() {
    const {
      readTerms,
    } = this.props;

    if (readTerms) {
      vocabNames.forEach((vocabName) => {
        readTerms(vocabName);
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      perms,
      readTerms,
    } = this.props;

    const {
      perms: prevPerms,
    } = prevProps;

    if (readTerms && perms !== prevPerms) {
      vocabNames.forEach((vocabName) => {
        readTerms(vocabName);
      });
    }
  }

  formatFieldLabel(name) {
    const {
      intl,
    } = this.props;

    return intl.formatMessage(messages[name]);
  }

  formatOptionLabel(option) {
    const {
      intl,
    } = this.props;

    return (option.message ? intl.formatMessage(option.message) : option.value);
  }

  render() {
    const {
      /* eslint-disable no-unused-vars */
      intl,
      perms,
      readTerms,
      /* eslint-enable no-unused-vars */
      ...remainingProps
    } = this.props;

    return (
      <BaseStructuredDateInput
        defaultValue={Immutable.Map()}
        formatFieldLabel={this.formatFieldLabel}
        formatOptionLabel={this.formatOptionLabel}
        {...remainingProps}
      />
    );
  }
}

StructuredDateInput.propTypes = propTypes;

const IntlAwareStructuredDateInput = injectIntl(StructuredDateInput);

IntlAwareStructuredDateInput.propTypes = StructuredDateInput.propTypes;

export default IntlAwareStructuredDateInput;
