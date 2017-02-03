import Immutable from 'immutable';

import {
  PREFS_LOADED,
  COLLAPSE_PANEL,
  SET_ADVANCED_SEARCH_RECORD_TYPE,
  SET_ADVANCED_SEARCH_VOCABULARY,
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
    case SET_ADVANCED_SEARCH_RECORD_TYPE:
      return state.setIn(['advancedSearch', 'recordType'], action.payload);
    case SET_ADVANCED_SEARCH_VOCABULARY:
      return state.setIn(
        ['advancedSearch', 'vocabulary', state.getIn(['advancedSearch', 'recordType'])],
        action.payload
      );
    case SET_KEYWORD_SEARCH_RECORD_TYPE:
      return state.setIn(['keywordSearch', 'recordType'], action.payload);
    case SET_KEYWORD_SEARCH_VOCABULARY:
      return state.setIn(
        ['keywordSearch', 'vocabulary', state.getIn(['keywordSearch', 'recordType'])],
        action.payload
      );
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

export const getAdvancedSearchRecordType = state =>
  state.getIn(['advancedSearch', 'recordType']);

export const getAdvancedSearchVocabulary = (state, recordType) =>
  state.getIn(['advancedSearch', 'vocabulary', recordType]);

export const getKeywordSearchRecordType = state =>
  state.getIn(['keywordSearch', 'recordType']);

export const getKeywordSearchVocabulary = (state, recordType) =>
  state.getIn(['keywordSearch', 'vocabulary', recordType]);

export const getSearchPageSize = state =>
  state.get('searchPageSize');

export const getSearchPanelPageSize = (state, recordType, name) =>
  state.getIn(['panels', recordType, name, 'pageSize']);

export const isPanelCollapsed = (state, recordType, name) =>
  state.getIn(['panels', recordType, name, 'collapsed']);
