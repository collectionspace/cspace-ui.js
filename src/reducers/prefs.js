import Immutable from 'immutable';

import {
  PREFS_LOADED,
  COLLAPSE_PANEL,
  SET_RECORD_BROWSER_NAV_BAR_ITEMS,
  SET_SEARCH_PAGE_RECORD_TYPE,
  SET_SEARCH_PAGE_VOCABULARY,
  SET_QUICK_SEARCH_RECORD_TYPE,
  SET_QUICK_SEARCH_VOCABULARY,
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
    case SET_RECORD_BROWSER_NAV_BAR_ITEMS:
      return state.setIn(
        ['recordBrowserNavBarItems', action.meta.recordType], action.payload
      );
    case SET_SEARCH_PAGE_RECORD_TYPE:
      return state.setIn(['searchPage', 'recordType'], action.payload);
    case SET_SEARCH_PAGE_VOCABULARY:
      return state.setIn(
        ['searchPage', 'vocabulary', state.getIn(['searchPage', 'recordType'])],
        action.payload
      );
    case SET_QUICK_SEARCH_RECORD_TYPE:
      return state.setIn(['quickSearch', 'recordType'], action.payload);
    case SET_QUICK_SEARCH_VOCABULARY:
      return state.setIn(
        ['quickSearch', 'vocabulary', state.getIn(['quickSearch', 'recordType'])],
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

export const getSearchPageRecordType = state =>
  state.getIn(['searchPage', 'recordType']);

export const getSearchPageVocabulary = (state, recordType) =>
  state.getIn(['searchPage', 'vocabulary', recordType]);

export const getQuickSearchRecordType = state =>
  state.getIn(['quickSearch', 'recordType']);

export const getQuickSearchVocabulary = (state, recordType) =>
  state.getIn(['quickSearch', 'vocabulary', recordType]);

export const getSearchPageSize = state =>
  state.get('searchPageSize');

export const getSearchPanelPageSize = (state, recordType, name) =>
  state.getIn(['panels', recordType, name, 'pageSize']);

export const isPanelCollapsed = (state, recordType, name) =>
  state.getIn(['panels', recordType, name, 'collapsed']);

export const getRecordBrowserNavBarItems = (state, recordType) =>
  state.getIn(['recordBrowserNavBarItems', recordType]);
