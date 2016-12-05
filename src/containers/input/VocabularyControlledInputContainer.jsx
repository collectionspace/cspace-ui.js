import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import warning from 'warning';
import { readVocabularyItems } from '../../actions/vocabulary';
import { getVocabulary } from '../../reducers';

const { VocabularyControlledInput } = inputComponents;

const messages = defineMessages({
  count: {
    id: 'vocabularyControlledInput.count',
    description: 'Message displayed in the vocabulary controlled input dropdown when filtering options.',
    defaultMessage: `{count, plural,
        =0 {No matching terms}
        one {# matching term}
        other {# matching terms}
    } found`,
  },
});

const mapStateToProps = (state, ownProps) => {
  const {
    intl,
    vocabularyName,
  } = ownProps;

  const vocabulary = getVocabulary(state, vocabularyName);

  return {
    formatStatusMessage: count => intl.formatMessage(messages.count, { count }),
    // isLoading: vocabulary ? vocabulary.isReadPending : true,
    terms: vocabulary ? vocabulary.items : null,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    name,
    vocabularyName,
  } = ownProps;

  warning(vocabularyName,
    `The vocabulary controlled input with name '${name}' is not associated with a vocabulary. Set the 'vocabularyName' prop.`);

  if (vocabularyName) {
    return {
      onMount: () => {
        dispatch(readVocabularyItems(vocabularyName));
      },
    };
  }

  return {};
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    /* eslint-disable no-unused-vars */
    intl,
    onMount,
    vocabularyName,
    /* eslint-enable no-unused-vars */
    ...remainingOwnProps
  } = ownProps;

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};

export const ConnectedVocabularyControlledInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(VocabularyControlledInput);

const IntlAwareConnectedVocabularyControlledInput = injectIntl(ConnectedVocabularyControlledInput);

IntlAwareConnectedVocabularyControlledInput.propTypes = {
  ...VocabularyControlledInput.propTypes,
  vocabularyName: PropTypes.string.isRequired,
};

export default IntlAwareConnectedVocabularyControlledInput;
