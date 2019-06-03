import Immutable from 'immutable';
import { OP_AND, OP_OR } from '../constants/searchOperators';

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
  SET_STICKY_FIELDS,
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_TO_SELECT_ADVANCED,
} from '../constants/actionCodes';

const handleAdvancedSearchConditionChange = (state, action) => {
  const condition = action.payload;
  const op = condition ? condition.get('op') : null;

  return ((op === OP_AND || op === OP_OR) ? state.set('advancedSearchBooleanOp', op) : state);
};

const handleToggleRecordSidebar = (state) => {
  let isOpen = state.get('recordSidebarOpen');

  if (typeof isOpen === 'undefined') {
    isOpen = true;
  }

  return state.set('recordSidebarOpen', !isOpen);
};

const setStickyFields = (state, action) => {
  const data = action.payload;
  const { recordTypeConfig } = action.meta;

  return state.setIn(['stickyFields', recordTypeConfig.name], data);
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case PREFS_LOADED:
      return (action.payload || Immutable.Map());
    case COLLAPSE_PANEL:
      return state.setIn(
        ['panels', action.meta.recordType, action.meta.name, 'collapsed'], action.payload
      );
    case SET_ADMIN_TAB:
      return state.set('adminTab', action.payload);
    case SET_TOOL_TAB:
      return state.set('toolTab', action.payload);
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
    case SET_SEARCH_PANEL_PAGE_SIZE:
      return state.setIn(
        ['panels', action.meta.recordType, action.meta.name, 'pageSize'], action.payload
      );
    case SET_SEARCH_RESULT_PAGE_PAGE_SIZE:
      return state.set('searchResultPagePageSize', action.payload);
    case SET_SEARCH_TO_SELECT_PAGE_SIZE:
      return state.set('searchToSelectPageSize', action.payload);
    case SET_FORM:
      return state.setIn(['form', action.meta.recordType], action.payload);
    case SET_UPLOAD_TYPE:
      return state.set('uploadType', action.payload);
    case SET_SEARCH_PAGE_ADVANCED:
    case SET_SEARCH_TO_SELECT_ADVANCED:
      return handleAdvancedSearchConditionChange(state, action);
    case TOGGLE_RECORD_SIDEBAR:
      return handleToggleRecordSidebar(state, action);
    case SET_STICKY_FIELDS:
      return setStickyFields(state, action);
    default:
      return state;
  }
};

export const getAdvancedSearchBooleanOp = state =>
  state.get('advancedSearchBooleanOp');

export const getSearchPageRecordType = state =>
  state.getIn(['searchPage', 'recordType']);

export const getSearchPageVocabulary = (state, recordType) =>
  state.getIn(['searchPage', 'vocabulary', recordType]);

export const getQuickSearchRecordType = state =>
  state.getIn(['quickSearch', 'recordType']);

export const getQuickSearchVocabulary = (state, recordType) =>
  state.getIn(['quickSearch', 'vocabulary', recordType]);

export const getSearchPanelPageSize = (state, recordType, name) =>
  state.getIn(['panels', recordType, name, 'pageSize']);

export const getSearchResultPagePageSize = state =>
  state.get('searchResultPagePageSize');

export const getSearchToSelectPageSize = state =>
  state.get('searchToSelectPageSize');

export const isPanelCollapsed = (state, recordType, name) =>
  state.getIn(['panels', recordType, name, 'collapsed']);

export const getRecordBrowserNavBarItems = (state, recordType) =>
  state.getIn(['recordBrowserNavBarItems', recordType]);

export const getForm = (state, recordType) =>
  state.getIn(['form', recordType]);

export const getUploadType = state =>
  state.get('uploadType');

export const getAdminTab = state =>
  state.get('adminTab');

export const getToolTab = state =>
  state.get('toolTab');

export const isRecordSidebarOpen = state => state.get('recordSidebarOpen');

export const getStickyFields = (state, recordType) => {
  if (typeof recordType === 'undefined') {
    return state.get('stickyFields');
  }

  return state.getIn(['stickyFields', recordType]);
};
