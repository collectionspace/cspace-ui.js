import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import warning from 'warning';
import { readVocabularyItems } from '../../actions/vocabulary';
import { getVocabulary } from '../../reducers';

const { TermPickerInput } = inputComponents;

const messages = defineMessages({
  count: {
    id: 'termPickerInputContainer.count',
    description: 'Message displayed in the term picker input dropdown when filtering options.',
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
    source,
  } = ownProps;

  const vocabulary = getVocabulary(state, source);

  return {
    formatStatusMessage: count => intl.formatMessage(messages.count, { count }),
    // isLoading: vocabulary ? vocabulary.isReadPending : true,
    terms: vocabulary ? vocabulary.items : null,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    name,
    source,
  } = ownProps;

  warning(source,
    `The term picker input with name '${name}' is not associated with a term source. Set the 'source' prop.`);

  if (source) {
    return {
      onMount: () => {
        dispatch(readVocabularyItems(source));
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
    source,
    /* eslint-enable no-unused-vars */
    ...remainingOwnProps
  } = ownProps;

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};

export const ConnectedTermPickerInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TermPickerInput);

const IntlizedConnectedTermPickerInput = injectIntl(ConnectedTermPickerInput);

IntlizedConnectedTermPickerInput.propTypes = {
  ...TermPickerInput.propTypes,
  source: PropTypes.string.isRequired,
};

export default IntlizedConnectedTermPickerInput;
