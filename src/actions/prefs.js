/* global window */

import Immutable from 'immutable';
import { getPrefs } from '../reducers';

export const PREFS_LOADED = 'PREFS_LOADED';
export const COLLAPSE_PANEL = 'COLLAPSE_PANEL';
export const SET_RECORD_BROWSER_NAV_BAR_ITEMS = 'SET_RECORD_BROWSER_NAV_BAR_ITEMS';
export const SET_SEARCH_PAGE_RECORD_TYPE = 'SET_SEARCH_PAGE_RECORD_TYPE';
export const SET_SEARCH_PAGE_VOCABULARY = 'SET_SEARCH_PAGE_VOCABULARY';
export const SET_QUICK_SEARCH_RECORD_TYPE = 'SET_QUICK_SEARCH_RECORD_TYPE';
export const SET_QUICK_SEARCH_VOCABULARY = 'SET_QUICK_SEARCH_VOCABULARY';
export const SET_SEARCH_PANEL_PAGE_SIZE = 'SET_SEARCH_PANEL_PAGE_SIZE';
export const SET_SEARCH_RESULT_PAGE_PAGE_SIZE = 'SET_SEARCH_RESULT_PAGE_PAGE_SIZE';
export const SET_SEARCH_TO_RELATE_PAGE_SIZE = 'SET_SEARCH_TO_RELATE_PAGE_SIZE';

export const storageKey = 'cspace-ui.prefs';

export const collapsePanel = (recordType, name, collapsed) => ({
  type: COLLAPSE_PANEL,
  payload: collapsed,
  meta: {
    recordType,
    name,
  },
});

export const setRecordBrowserNavBarItems = (recordType, navBarItems) => ({
  type: SET_RECORD_BROWSER_NAV_BAR_ITEMS,
  payload: navBarItems,
  meta: {
    recordType,
  },
});

export const setSearchPageRecordType = value => ({
  type: SET_SEARCH_PAGE_RECORD_TYPE,
  payload: value,
});

export const setSearchPageVocabulary = value => ({
  type: SET_SEARCH_PAGE_VOCABULARY,
  payload: value,
});

export const setQuickSearchRecordType = value => ({
  type: SET_QUICK_SEARCH_RECORD_TYPE,
  payload: value,
});

export const setQuickSearchVocabulary = value => ({
  type: SET_QUICK_SEARCH_VOCABULARY,
  payload: value,
});

export const setSearchPanelPageSize = (recordType, name, pageSize) => ({
  type: SET_SEARCH_PANEL_PAGE_SIZE,
  payload: pageSize,
  meta: {
    recordType,
    name,
  },
});

export const setSearchResultPagePageSize = pageSize => ({
  type: SET_SEARCH_RESULT_PAGE_PAGE_SIZE,
  payload: pageSize,
});

export const setSearchToRelatePageSize = pageSize => ({
  type: SET_SEARCH_TO_RELATE_PAGE_SIZE,
  payload: pageSize,
});

export const loadPrefs = () => {
  // TODO: Load prefs from server (requires adding services layer support).
  // For now, just load from local storage.

  const serializedPrefs = window.localStorage.getItem(storageKey);

  let prefs = null;

  if (serializedPrefs) {
    try {
      prefs = Immutable.fromJS(JSON.parse(serializedPrefs));
    } catch (error) {
      prefs = null;
    }
  }

  return {
    type: PREFS_LOADED,
    payload: prefs,
  };
};

export const savePrefs = () => (dispatch, getState) => {
  // TODO: Save prefs to server (requires adding services layer support).
  // For now, just save to local storage.

  const prefs = getPrefs(getState());

  window.localStorage.setItem(storageKey, JSON.stringify(prefs.toJS()));
};
