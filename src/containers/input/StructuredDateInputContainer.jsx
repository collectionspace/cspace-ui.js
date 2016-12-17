import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import { readVocabularyItems } from '../../actions/vocabulary';
import { getOptionList, getVocabulary } from '../../reducers';

const { StructuredDateInput } = inputComponents;

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

const optionListNames = ['dateQualifiers'];
const vocabNames = ['dateera', 'datecertainty', 'datequalifier'];

const mapStateToProps = (state, ownProps) => {
  const {
    intl,
  } = ownProps;

  const optionLists = {};
  const terms = {};

  optionListNames.forEach((optionListName) => {
    optionLists[optionListName] = getOptionList(state, optionListName);
  });

  vocabNames.forEach((vocabName) => {
    const vocab = getVocabulary(state, vocabName);

    terms[vocabName] = vocab ? vocab.items : null;
  });

  return {
    optionLists,
    terms,
    formatFieldLabel: name => intl.formatMessage(messages[name]),
    formatOptionLabel: option => (
      option.messageDescriptor ? intl.formatMessage(option.messageDescriptor) : option.value
    ),
  };
};

const mapDispatchToProps = dispatch => ({
  onMount: () => {
    vocabNames.forEach((vocabName) => {
      dispatch(readVocabularyItems(vocabName));
    });
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    /* eslint-disable no-unused-vars */
    intl,
    /* eslint-enable no-unused-vars */
    ...remainingOwnProps
  } = ownProps;

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};

export const ConnectedStructuredDateInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(StructuredDateInput);

const IntlizedConnectedStructuredDateInput = injectIntl(ConnectedStructuredDateInput);

IntlizedConnectedStructuredDateInput.propTypes = StructuredDateInput.propTypes;

export default IntlizedConnectedStructuredDateInput;
