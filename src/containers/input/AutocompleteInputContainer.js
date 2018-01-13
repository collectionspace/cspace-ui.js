// TODO: Break out non-state related props into a separate component. This component should just
// connect to redux state.

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import get from 'lodash/get';
import pickBy from 'lodash/pickBy';
import { components as inputComponents } from 'cspace-input';
import warning from 'warning';
import { canCreate } from '../../helpers/permissionHelpers';
import parseResourceID from '../../helpers/parseResourceID';

import {
  addTerm,
  findMatchingTerms,
  clearMatchedTerms,
} from '../../actions/partialTermSearch';

import withConfig from '../../enhancers/withConfig';

import {
  getPartialTermSearchMatches,
  getUserPerms,
} from '../../reducers';

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
  addPrompt: {
    id: 'autocompleteInputContainer.addPrompt',
    description: 'Message displayed in the autocomplete input dropdown to prompt a user to add a new term.',
    defaultMessage: 'Add {displayName} to',
  },
});

const getRecordTypes = (config, perms) => {
  const { recordTypes } = config;

  return pickBy(recordTypes, (recordTypeConfig, name) => {
    const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

    return (
      (
        serviceType === 'object' ||
        serviceType === 'procedure' ||
        serviceType === 'authority'
      ) &&
      canCreate(name, perms)
    );
  });
};

const mapStateToProps = (state, ownProps) => {
  const {
    intl,
    config,
  } = ownProps;

  const perms = getUserPerms(state);

  return {
    findDelay: config.autocompleteFindDelay,
    minLength: config.autocompleteMinLength,
    matches: getPartialTermSearchMatches(state),
    recordTypes: getRecordTypes(config, perms),
    formatAddPrompt: displayName => intl.formatMessage(messages.addPrompt, { displayName }),
    formatMoreCharsRequiredMessage: () => intl.formatMessage(messages.moreCharsRequired),
    formatSearchResultMessage: count => intl.formatMessage(messages.count, { count }),
    formatSourceName: (recordTypeConfig, vocabulary) => intl.formatMessage(
      vocabulary
        ? get(recordTypeConfig, ['vocabularies', vocabulary, 'messages', 'collectionName'])
        : get(recordTypeConfig, ['messages', 'record', 'collectionName'])
    ),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    source: sourceID,
    onClose,
  } = ownProps;

  const sources = parseResourceID(sourceID);

  return {
    addTerm: (recordType, vocabulary, displayName) => {
      const recordTypeConfig = get(config, ['recordTypes', recordType]);

      warning(recordTypeConfig, `The record type '${recordType}' is not configured. Check the source prop of the input with name '${ownProps.name}'.`);

      if (recordTypeConfig) {
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

        if (recordTypeConfig) {
          dispatch(findMatchingTerms(recordTypeConfig, vocabulary, partialTerm));
        }
      });
    },
    onClose: () => {
      dispatch(clearMatchedTerms());

      if (onClose) {
        onClose();
      }
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
