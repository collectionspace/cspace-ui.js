/* global window */

import Immutable from 'immutable';
import { getUserUsername, getPrefs } from '../reducers';

export const PREFS_LOADED = 'PREFS_LOADED';
export const COLLAPSE_PANEL = 'COLLAPSE_PANEL';
export const SET_ADMIN_TAB = 'SET_ADMIN_TAB';
export const SET_RECORD_BROWSER_NAV_BAR_ITEMS = 'SET_RECORD_BROWSER_NAV_BAR_ITEMS';
export const SET_SEARCH_PAGE_RECORD_TYPE = 'SET_SEARCH_PAGE_RECORD_TYPE';
export const SET_SEARCH_PAGE_VOCABULARY = 'SET_SEARCH_PAGE_VOCABULARY';
export const SET_QUICK_SEARCH_RECORD_TYPE = 'SET_QUICK_SEARCH_RECORD_TYPE';
export const SET_QUICK_SEARCH_VOCABULARY = 'SET_QUICK_SEARCH_VOCABULARY';
export const SET_SEARCH_PANEL_PAGE_SIZE = 'SET_SEARCH_PANEL_PAGE_SIZE';
export const SET_SEARCH_RESULT_PAGE_PAGE_SIZE = 'SET_SEARCH_RESULT_PAGE_PAGE_SIZE';
export const SET_SEARCH_TO_RELATE_PAGE_SIZE = 'SET_SEARCH_TO_RELATE_PAGE_SIZE';
export const SET_FORM = 'SET_FORM';
export const SET_UPLOAD_TYPE = 'SET_UPLOAD_TYPE';
export const TOGGLE_RECORD_SIDEBAR = 'TOGGLE_RECORD_SIDEBAR';

export const storageKey = 'cspace-ui';

export const collapsePanel = (recordType, name, collapsed) => ({
  type: COLLAPSE_PANEL,
  payload: collapsed,
  meta: {
    recordType,
    name,
  },
});

export const setAdminTab = tabName => ({
  type: SET_ADMIN_TAB,
  payload: tabName,
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

export const setForm = (recordType, formName) => ({
  type: SET_FORM,
  payload: formName,
  meta: {
    recordType,
  },
});

export const setUploadType = type => ({
  type: SET_UPLOAD_TYPE,
  payload: type,
});

export const toggleRecordSidebar = () => ({
  type: TOGGLE_RECORD_SIDEBAR,
});

export const loadPrefs = username => (dispatch) => {
  // TODO: Load prefs from server (requires adding services layer support).
  // For now, just load from local storage.

  let userPrefs = null;

  if (username) {
    const serializedPrefs = window.localStorage.getItem(storageKey);

    if (serializedPrefs) {
      try {
        userPrefs = Immutable.fromJS((JSON.parse(serializedPrefs))[username]);
      } catch (error) {
        userPrefs = null;
      }
    }
  }

  dispatch({
    type: PREFS_LOADED,
    payload: userPrefs,
  });
};

export const savePrefs = () => (dispatch, getState) => {
  // TODO: Save prefs to server (requires adding services layer support).
  // For now, just save to local storage.

  const username = getUserUsername(getState());

  let prefs;

  if (username) {
    const serializedPrefs = window.localStorage.getItem(storageKey);

    if (serializedPrefs) {
      try {
        prefs = JSON.parse(serializedPrefs);
      } catch (error) {
        prefs = null;
      }
    }

    if (!prefs) {
      prefs = {};
    }

    prefs[username] = getPrefs(getState());

    window.localStorage.setItem(storageKey, JSON.stringify(prefs));
  }
};
