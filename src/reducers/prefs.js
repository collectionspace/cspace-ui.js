import Immutable from 'immutable';
import { OP_AND, OP_OR } from '../constants/searchOperators';
import { clearAdvancedSearchConditionValues } from '../helpers/searchHelpers';

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
  SET_SEARCH_RESULT_PAGE_VIEW,
  SET_SEARCH_TO_SELECT_PAGE_SIZE,
  SET_FORM,
  SET_UPLOAD_TYPE,
  TOGGLE_RECORD_SIDEBAR,
  TOGGLE_SEARCH_RESULT_SIDEBAR,
  SET_STICKY_FIELDS,
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_TO_SELECT_ADVANCED,
  TOGGLE_USE_NEW_SEARCH,
  SET_NEW_SEARCH_SHOWN,
  SET_SEARCH_PAGE_ADVANCED_SEARCH_TERMS,
  SET_SEARCH_PAGE_ADVANCED_LIMIT_BY,
} from '../constants/actionCodes';

const handleAdvancedSearchConditionChange = (state, action) => {
  const { recordType, searchTermsGroup } = action.meta;

  if (!recordType) {
    return state;
  }

  const condition = action.payload;
  const op = condition ? condition.get('op') : null;

  let nextState = state;

  if (op === OP_AND || op === OP_OR) {
    nextState = searchTermsGroup
      ? nextState.setIn(['advancedSearchNewBooleanOp', searchTermsGroup], op)
      : nextState.set('advancedSearchBooleanOp', op);
  }

  nextState = nextState.setIn(
    searchTermsGroup
      ? ['searchNewCond', recordType, searchTermsGroup]
      : ['searchCond', recordType],
    clearAdvancedSearchConditionValues(condition),
  );

  return nextState;
};

const handleToggleRecordSidebar = (state) => {
  let isOpen = state.get('recordSidebarOpen');

  if (typeof isOpen === 'undefined') {
    isOpen = true;
  }

  return state.set('recordSidebarOpen', !isOpen);
};

const handleToggleSearchResultSidebar = (state) => {
  let isOpen = state.get('searchResultSidebarOpen');

  if (typeof isOpen === 'undefined') {
    isOpen = true;
  }

  return state.set('searchResultSidebarOpen', !isOpen);
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
        ['panels', action.meta.recordType, action.meta.name, 'collapsed'], action.payload,
      );
    case SET_ADMIN_TAB:
      return state.set('adminTab', action.payload);
    case SET_TOOL_TAB:
      return state.set('toolTab', action.payload);
    case SET_RECORD_BROWSER_NAV_BAR_ITEMS:
      return state.setIn(
        ['recordBrowserNavBarItems', action.meta.recordType], action.payload,
      );
    case SET_SEARCH_PAGE_RECORD_TYPE:
      return state.setIn(['searchPage', 'recordType'], action.payload);
    case SET_SEARCH_PAGE_VOCABULARY:
      return state.setIn(
        ['searchPage', 'vocabulary', state.getIn(['searchPage', 'recordType'])],
        action.payload,
      );
    case SET_QUICK_SEARCH_RECORD_TYPE:
      return state.setIn(['quickSearch', 'recordType'], action.payload);
    case SET_QUICK_SEARCH_VOCABULARY:
      return state.setIn(
        ['quickSearch', 'vocabulary', state.getIn(['quickSearch', 'recordType'])],
        action.payload,
      );
    case SET_SEARCH_PANEL_PAGE_SIZE:
      return state.setIn(
        ['panels', action.meta.recordType, action.meta.name, 'pageSize'], action.payload,
      );
    case SET_SEARCH_RESULT_PAGE_PAGE_SIZE:
      return state.set('searchResultPagePageSize', action.payload);
    case SET_SEARCH_RESULT_PAGE_VIEW:
      return state.set('searchResultPageView', action.payload);
    case SET_SEARCH_TO_SELECT_PAGE_SIZE:
      return state.set('searchToSelectPageSize', action.payload);
    case SET_FORM:
      return state.setIn(['form', action.meta.recordType], action.payload);
    case SET_UPLOAD_TYPE:
      return state.set('uploadType', action.payload);
    case SET_SEARCH_PAGE_ADVANCED:
    case SET_SEARCH_TO_SELECT_ADVANCED:
    case SET_SEARCH_PAGE_ADVANCED_SEARCH_TERMS:
    case SET_SEARCH_PAGE_ADVANCED_LIMIT_BY:
      return handleAdvancedSearchConditionChange(state, action);
    case TOGGLE_RECORD_SIDEBAR:
      return handleToggleRecordSidebar(state, action);
    case TOGGLE_SEARCH_RESULT_SIDEBAR:
      return handleToggleSearchResultSidebar(state, action);
    case SET_STICKY_FIELDS:
      return setStickyFields(state, action);
    case TOGGLE_USE_NEW_SEARCH:
      return state.set('useNewSearch', typeof state.get('useNewSearch') === 'undefined' ? false
        : !state.get('useNewSearch'));
    case SET_NEW_SEARCH_SHOWN:
      return state.set('newSearchShown', true);
    default:
      return state;
  }
};

export const getAdvancedSearchBooleanOp = (state) => state.get('advancedSearchBooleanOp');

export const getSearchCondition = (state, recordType) => state.getIn(['searchCond', recordType]);

export const getAdvancedSearchNewBooleanOp = (state, searchTermsGroup) => state.getIn(['advancedSearchNewBooleanOp', searchTermsGroup]);

export const getSearchNewCondition = (state, recordType, searchTermsGroup) => state.getIn(['searchNewCond', recordType, searchTermsGroup]);

export const getSearchPageRecordType = (state) => state.getIn(['searchPage', 'recordType']);

export const getSearchPageVocabulary = (state, recordType) => state.getIn(['searchPage', 'vocabulary', recordType]);

export const getQuickSearchRecordType = (state) => state.getIn(['quickSearch', 'recordType']);

export const getQuickSearchVocabulary = (state, recordType) => state.getIn(['quickSearch', 'vocabulary', recordType]);

export const getSearchPanelPageSize = (state, recordType, name) => state.getIn(['panels', recordType, name, 'pageSize']);

export const getSearchResultPagePageSize = (state) => state.get('searchResultPagePageSize');

export const getSearchResultPageView = (state) => state.get('searchResultPageView');

export const getSearchToSelectPageSize = (state) => state.get('searchToSelectPageSize');

export const isPanelCollapsed = (state, recordType, name) => state.getIn(['panels', recordType, name, 'collapsed']);

export const getRecordBrowserNavBarItems = (state, recordType) => state.getIn(['recordBrowserNavBarItems', recordType]);

export const getForm = (state, recordType) => state.getIn(['form', recordType]);

export const getUploadType = (state) => state.get('uploadType');

export const getAdminTab = (state) => state.get('adminTab');

export const getToolTab = (state) => state.get('toolTab');

export const getNewSearchShown = (state) => state.get('newSearchShown');

export const getUseNewSearch = (state) => state.get('useNewSearch');

export const isRecordSidebarOpen = (state) => state.get('recordSidebarOpen');

export const isSearchResultSidebarOpen = (state) => state.get('searchResultSidebarOpen');

export const getStickyFields = (state, recordType) => {
  if (typeof recordType === 'undefined') {
    return state.get('stickyFields');
  }

  return state.getIn(['stickyFields', recordType]);
};
