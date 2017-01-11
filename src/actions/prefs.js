// import { getPrefs } from '../reducers';

export const COLLAPSE_PANEL = 'COLLAPSE_PANEL';
export const SET_SEARCH_PAGE_SIZE = 'SET_SEARCH_PAGE_SIZE';

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

// export const loadPrefs = () => (dispatch, getState) => {
//   // TODO: Load prefs from server (requires adding services layer support).
//   // For now, just load from local storage.
//
//   window.localStorage.getItem('cspace-ui.prefs');
// };
//
// export const savePrefs = () => (dispatch, getState) => {
//   // TODO: Save prefs to server (requires adding services layer support).
//   // For now, just save to local storage.
//
//   const prefs = getPrefs(getState());
//
//   console.log(prefs.toJS());
//
//   window.localStorage.setItem('cspace-ui.prefs', prefs.toJSON());
// };
