import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import warning from 'warning';
import parseResourceID from '../../helpers/parseResourceID';

import {
  addTerm,
  findMatchingTerms,
  clearMatchedTerms,
} from '../../actions/partialTermSearch';

import withConfig from '../../enhancers/withConfig';
import { getPartialTermSearchMatches } from '../../reducers';

const { AutocompleteInput } = inputComponents;

const messages = defineMessages({
  count: {
    id: 'autocompleteInputContainer.count',
    description: 'Message displayed in the autocomplete input dropdown when filtering options.',
    defaultMessage: `{count, plural,
        =0 {No matching terms}
        one {# matching term}
        other {# matching terms}
    } found`,
  },
  moreCharsRequired: {
    id: 'autocompleteInputContainer.moreCharsRequired',
    description: 'Message displayed in the autocomplete input dropdown when more characters must be typed in order to begin matching.',
    defaultMessage: 'Continue typing to find matching terms',
  },
});

const mapStateToProps = (state, ownProps) => {
  const {
    intl,
    config,
  } = ownProps;

  return {
    formatMoreCharsRequiredMessage: () => intl.formatMessage(messages.moreCharsRequired),
    formatSearchResultMessage: count => intl.formatMessage(messages.count, { count }),
    formatVocabName: vocab => intl.formatMessage(vocab.messages.collectionName),
    matches: getPartialTermSearchMatches(state),
    recordTypes: config.recordTypes,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    source: sourceID,
  } = ownProps;

  const sources = parseResourceID(sourceID);

  return {
    addTerm: (recordType, vocabulary, displayName) => {
      const recordTypeConfig = config.recordTypes[recordType];

      warning(recordTypeConfig, `The record type '${recordType}' is not configured. Check the source prop of the input with name '${ownProps.name}'.`);

      if (
        recordTypeConfig &&
        recordTypeConfig.vocabularies &&
        recordTypeConfig.vocabularies[vocabulary]
      ) {
        dispatch(addTerm(recordTypeConfig, vocabulary, displayName));
      }
    },
    findMatchingTerms: (partialTerm) => {
      sources.forEach((source) => {
        const {
          recordType,
          vocabulary,
        } = source;

        const recordTypeConfig = config.recordTypes[recordType];

        warning(recordTypeConfig, `The record type '${recordType}' is not configured. Check the source prop of the input with name '${ownProps.name}'.`);

        if (
          recordTypeConfig &&
          recordTypeConfig.vocabularies &&
          recordTypeConfig.vocabularies[vocabulary]
        ) {
          dispatch(findMatchingTerms(recordTypeConfig, vocabulary, partialTerm));
        }
      });
    },
    onClose: () => {
      dispatch(clearMatchedTerms());
    },
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    /* eslint-disable no-unused-vars */
    intl,
    config,
    /* eslint-enable no-unused-vars */
    ...remainingOwnProps
  } = ownProps;

  return {
    ...remainingOwnProps,
    ...stateProps,
    ...dispatchProps,
  };
};


export const ConnectedAutocompleteInput = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AutocompleteInput);

const IntlizedConnectedAutocompleteInput =
  injectIntl(withConfig(ConnectedAutocompleteInput));

IntlizedConnectedAutocompleteInput.propTypes = {
  ...AutocompleteInput.propTypes,
  source: PropTypes.string.isRequired,
  config: PropTypes.object,
};

export default IntlizedConnectedAutocompleteInput;
