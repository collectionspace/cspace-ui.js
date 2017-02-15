import Immutable from 'immutable';

import {
  PREFS_LOADED,
  COLLAPSE_PANEL,
  SET_KEYWORD_SEARCH_RECORD_TYPE,
  SET_KEYWORD_SEARCH_VOCABULARY,
  SET_SEARCH_PAGE_SIZE,
  SET_SEARCH_PANEL_PAGE_SIZE,
} from '../actions/prefs';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case PREFS_LOADED:
      return (action.payload || state);
    case COLLAPSE_PANEL:
      return state.setIn(
        ['panels', action.meta.recordType, action.meta.name, 'collapsed'], action.payload
      );
    case SET_KEYWORD_SEARCH_RECORD_TYPE:
      return (
        state
          .setIn(['keywordSearch', 'recordType'], action.payload)
          .deleteIn(['keywordSearch', 'vocabulary'])
      );
    case SET_KEYWORD_SEARCH_VOCABULARY:
      return state.setIn(['keywordSearch', 'vocabulary'], action.payload);
    case SET_SEARCH_PAGE_SIZE:
      return state.set('searchPageSize', action.payload);
    case SET_SEARCH_PANEL_PAGE_SIZE:
      return state.setIn(
        ['panels', action.meta.recordType, action.meta.name, 'pageSize'], action.payload
      );
    default:
      return state;
  }
};

export const getKeywordSearchRecordType = state =>
  state.getIn(['keywordSearch', 'recordType']);

export const getKeywordSearchVocabulary = state =>
  state.getIn(['keywordSearch', 'vocabulary']);

export const getSearchPageSize = state =>
  state.get('searchPageSize');

export const getSearchPanelPageSize = (state, recordType, name) =>
  state.getIn(['panels', recordType, name, 'pageSize']);

export const isPanelCollapsed = (state, recordType, name) =>
  state.getIn(['panels', recordType, name, 'collapsed']);
