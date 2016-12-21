import Immutable from 'immutable';

import {
  ADD_TERM_STARTED,
  ADD_TERM_FULFILLED,
  ADD_TERM_REJECTED,
  PARTIAL_TERM_SEARCH_STARTED,
  PARTIAL_TERM_SEARCH_FULFILLED,
  PARTIAL_TERM_SEARCH_REJECTED,
  CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
} from '../actions/partialTermSearch';

export default (state = Immutable.Map(), action) => {
  let count;
  let items;

  switch (action.type) {
    case ADD_TERM_STARTED:
      return state.setIn([
        action.meta.displayName,
        action.meta.authorityName,
        action.meta.vocabularyName,
      ], Immutable.Map({
        isAddPending: true,
      }));
    case ADD_TERM_FULFILLED:
      return state.setIn([
        action.meta.displayName,
        action.meta.authorityName,
        action.meta.vocabularyName,
      ], Immutable.Map({
        newTerm: Immutable.fromJS(action.payload.data),
      }));
    case ADD_TERM_REJECTED:
      return state.setIn([
        action.meta.displayName,
        action.meta.authorityName,
        action.meta.vocabularyName,
      ], Immutable.Map({
        error: action.payload,
      }));
    case PARTIAL_TERM_SEARCH_STARTED:
      return state.setIn([
        action.meta.partialTerm,
        action.meta.authorityName,
        action.meta.vocabularyName,
      ], Immutable.Map({
        isSearchPending: true,
      }));
    case PARTIAL_TERM_SEARCH_FULFILLED:
      count = parseInt(action.payload.data['ns2:abstract-common-list'].itemsInPage, 10);

      if (isNaN(count) || count === 0) {
        items = [];
      } else {
        items = action.payload.data['ns2:abstract-common-list']['list-item'];

        if (!Array.isArray(items)) {
          items = [items];
        }
      }

      return state.setIn([
        action.meta.partialTerm,
        action.meta.authorityName,
        action.meta.vocabularyName,
      ], Immutable.Map({
        items,
      }));
    case PARTIAL_TERM_SEARCH_REJECTED:
      return state.setIn([
        action.meta.partialTerm,
        action.meta.authorityName,
        action.meta.vocabularyName,
      ], Immutable.Map({
        error: action.payload,
      }));
    case CLEAR_PARTIAL_TERM_SEARCH_RESULTS:
      return state.clear();
    default:
      return state;
  }
};

export function getMatches(state) {
  return state;
}
