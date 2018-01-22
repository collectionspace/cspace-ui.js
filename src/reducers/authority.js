import Immutable from 'immutable';
import get from 'lodash/get';
import { getRecordTypeConfigByUri, getVocabularyConfigByShortID } from '../helpers/configHelpers';

import {
  AUTH_VOCABS_READ_FULFILLED,
  SET_AUTH_VOCAB_WORKFLOW_STATE,
} from '../actions/authority';

import {
  LOGOUT_FULFILLED,
} from '../actions/logout';

const handleAuthVocabsReadFulfilled = (state, action) => {
  const responses = action.payload;
  const { config } = action.meta;

  let nextState = Immutable.Map();

  responses.forEach((response) => {
    let items = get(response, ['data', 'ns2:abstract-common-list', 'list-item']);

    if (!items) {
      return;
    }

    if (!Array.isArray(items)) {
      items = [items];
    }

    items.forEach((item) => {
      const recordTypeConfig = getRecordTypeConfigByUri(config, item.uri);

      if (recordTypeConfig) {
        const vocabularyConfig =
          getVocabularyConfigByShortID(recordTypeConfig, item.shortIdentifier);

        if (vocabularyConfig) {
          nextState =
            nextState.setIn([recordTypeConfig.name, vocabularyConfig.name], Immutable.Map({
              csid: item.csid,
              workflowState: item.workflowState,
            }));
        }
      }
    });
  });

  return nextState;
};

const clearAll = state => state.clear();

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case AUTH_VOCABS_READ_FULFILLED:
      return handleAuthVocabsReadFulfilled(state, action);
    case LOGOUT_FULFILLED:
      return clearAll(state);
    case SET_AUTH_VOCAB_WORKFLOW_STATE:
      // There's no action creator that creates this action, but it's useful for testing via Redux
      // dev tools.

      return state.setIn(
        [action.meta.recordType, action.meta.vocabulary, 'workflowState'], action.payload);
    default:
      return state;
  }
};

export const getVocabCsid = (state, recordType, vocabulary) =>
  state.getIn([recordType, vocabulary, 'csid']);

export const getVocabWorkflowState = (state, recordType, vocabulary) =>
  state.getIn([recordType, vocabulary, 'workflowState']);
