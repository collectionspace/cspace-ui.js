/* global window */

import Immutable from 'immutable';
import get from 'lodash/get';
import { getStickyFieldValues } from '../helpers/recordDataHelpers';

import {
  getUserUsername,
  getPrefs,
  getRecordData,
  getSearchPageRecordType,
} from '../reducers';

import {
  PREFS_LOADED,
  COLLAPSE_PANEL,
  SET_ADMIN_TAB,
  SET_TOOL_TAB,
  SET_RECORD_BROWSER_NAV_BAR_ITEMS,
  SET_SEARCH_PAGE_RECORD_TYPE,
  SET_SEARCH_PAGE_VOCABULARY,
  SET_QUICK_SEARCH_RECORD_TYPE,
  SET_QUICK_SEARCH_VOCABULARY,
  SET_SEARCH_PANEL_PAGE_SIZE,
  SET_SEARCH_RESULT_PAGE_PAGE_SIZE,
  SET_SEARCH_TO_SELECT_PAGE_SIZE,
  SET_FORM,
  SET_UPLOAD_TYPE,
  TOGGLE_RECORD_SIDEBAR,
  TOGGLE_SEARCH_RESULT_SIDEBAR,
  SET_STICKY_FIELDS,
  TOGGLE_USE_NEW_SEARCH,
} from '../constants/actionCodes';

export const storageKey = 'cspace-ui';

export const collapsePanel = (recordType, name, collapsed) => ({
  type: COLLAPSE_PANEL,
  payload: collapsed,
  meta: {
    recordType,
    name,
  },
});

export const setAdminTab = (tabName) => ({
  type: SET_ADMIN_TAB,
  payload: tabName,
});

export const setToolTab = (tabName) => ({
  type: SET_TOOL_TAB,
  payload: tabName,
});

export const setRecordBrowserNavBarItems = (recordType, navBarItems) => ({
  type: SET_RECORD_BROWSER_NAV_BAR_ITEMS,
  payload: navBarItems,
  meta: {
    recordType,
  },
});

export const setSearchPageRecordType = (value) => (dispatch, getState) => {
  if (value !== getSearchPageRecordType(getState())) {
    dispatch({
      type: SET_SEARCH_PAGE_RECORD_TYPE,
      payload: value,
    });
  }
};

export const setSearchPageVocabulary = (value) => ({
  type: SET_SEARCH_PAGE_VOCABULARY,
  payload: value,
});

export const setQuickSearchRecordType = (value) => ({
  type: SET_QUICK_SEARCH_RECORD_TYPE,
  payload: value,
});

export const setQuickSearchVocabulary = (value) => ({
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

export const setSearchResultPagePageSize = (pageSize) => ({
  type: SET_SEARCH_RESULT_PAGE_PAGE_SIZE,
  payload: pageSize,
});

export const setSearchToSelectPageSize = (pageSize) => ({
  type: SET_SEARCH_TO_SELECT_PAGE_SIZE,
  payload: pageSize,
});

export const setForm = (recordType, formName) => ({
  type: SET_FORM,
  payload: formName,
  meta: {
    recordType,
  },
});

export const setUploadType = (type) => ({
  type: SET_UPLOAD_TYPE,
  payload: type,
});

export const toggleRecordSidebar = () => ({
  type: TOGGLE_RECORD_SIDEBAR,
});

export const toggleSearchResultSidebar = () => ({
  type: TOGGLE_SEARCH_RESULT_SIDEBAR,
});

export const setStickyFields = (recordTypeConfig, csid) => (dispatch, getState) => {
  const data = getRecordData(getState(), csid);

  if (data) {
    const stickyData = getStickyFieldValues(recordTypeConfig, data);

    dispatch({
      type: SET_STICKY_FIELDS,
      payload: stickyData,
      meta: {
        recordTypeConfig,
      },
    });
  }
};

export const toggleUseNewSearch = () => ({
  type: TOGGLE_USE_NEW_SEARCH,
});

export const loadPrefs = (config, username) => (dispatch) => {
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

  const defaultUserPrefs = get(config, 'defaultUserPrefs');

  if (defaultUserPrefs) {
    userPrefs = (Immutable.fromJS(defaultUserPrefs)).mergeDeep(userPrefs);
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
