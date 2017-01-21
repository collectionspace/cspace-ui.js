/* global window */

import Immutable from 'immutable';
import { getPrefs } from '../reducers';

export const PREFS_LOADED = 'PREFS_LOADED';
export const COLLAPSE_PANEL = 'COLLAPSE_PANEL';
export const SET_SEARCH_PAGE_SIZE = 'SET_SEARCH_PAGE_SIZE';

export const storageKey = 'cspace-ui.prefs';

export const collapsePanel = (recordType, name, collapsed) => ({
  type: COLLAPSE_PANEL,
  payload: collapsed,
  meta: {
    recordType,
    name,
  },
});

export const setSearchPageSize = pageSize => ({
  type: SET_SEARCH_PAGE_SIZE,
  payload: pageSize,
});

export const loadPrefs = () => {
  // TODO: Load prefs from server (requires adding services layer support).
  // For now, just load from local storage.

  const serializedPrefs = window.localStorage.getItem(storageKey);

  let prefs;

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
