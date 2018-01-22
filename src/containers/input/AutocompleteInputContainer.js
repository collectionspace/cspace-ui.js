// TODO: Break out non-state related props into a separate component. This component should just
// connect to redux state.

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import get from 'lodash/get';
import { components as inputComponents } from 'cspace-input';
import warning from 'warning';
import { canCreate, canList } from '../../helpers/permissionHelpers';
import parseResourceID from '../../helpers/parseResourceID';
import { isLocked } from '../../helpers/workflowStateHelpers';

import {
  addTerm,
  findMatchingTerms,
  clearMatchedTerms,
} from '../../actions/partialTermSearch';

import withConfig from '../../enhancers/withConfig';

import {
  getAuthorityVocabWorkflowState,
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

const filterSource = (source, perms) => {
  // Filter out sources for which we don't have list permission.

  if (!source) {
    return source;
  }

  const filtered = (
    source
      .split(',')
      .filter(sourceID => canList(sourceID.split('/', 1)[0], perms))
      .join(',')
  );

  return filtered;
};

const filterQuickAddTo = (source, perms, state) => {
  // Filter out sources for which we don't have create permission, or are locked.

  if (!source) {
    return source;
  }

  return (
    source
      .split(',')
      .filter((sourceID) => {
        const [recordType, vocabulary] = sourceID.split('/');

        return (
          canCreate(recordType, perms) &&
          !isLocked(getAuthorityVocabWorkflowState(state, recordType, vocabulary))
        );
      })
      .join(',')
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    intl,
    config,
    source,
  } = ownProps;

  const perms = getUserPerms(state);

  return {
    findDelay: config.autocompleteFindDelay,
    minLength: config.autocompleteMinLength,
    matches: getPartialTermSearchMatches(state),
    recordTypes: config.recordTypes,
    source: filterSource(source, perms),
    quickAddTo: filterQuickAddTo(source, perms, state),
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
    onClose,
  } = ownProps;


  return {
    addTerm: (recordType, vocabulary, displayName) => {
      const recordTypeConfig = get(config, ['recordTypes', recordType]);

      warning(recordTypeConfig, `The record type '${recordType}' is not configured. Check the source prop of the input with name '${ownProps.name}'.`);

      if (recordTypeConfig) {
        dispatch(addTerm(recordTypeConfig, vocabulary, displayName));
      }
    },
    findMatchingTerms: (source, partialTerm) => {
      const sources = parseResourceID(source);

      sources.forEach((sourceSpec) => {
        const {
          recordType,
          vocabulary,
        } = sourceSpec;

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
