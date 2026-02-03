import {
  CLEAR_SEARCH_TO_SELECT,
  SET_SEARCH_TO_SELECT_KEYWORD,
  SET_SEARCH_TO_SELECT_ADVANCED,
  SET_SEARCH_TO_SELECT_RECORD_TYPE,
  SET_SEARCH_TO_SELECT_VOCABULARY,
  SET_SEARCH_TO_SELECT_ADVANCED_LIMIT_BY,
  SET_SEARCH_TO_SELECT_ADVANCED_SEARCH_TERMS,
} from '../constants/actionCodes';

import {
  getSearchToSelectRecordType,
} from '../reducers';
import {
  SEARCH_TERMS_GROUP_LIMIT_BY,
  SEARCH_TERMS_GROUP_SEARCH_TERMS,
} from '../constants/searchNames';

export const clearSearchToSelect = () => ({
  type: CLEAR_SEARCH_TO_SELECT,
});

export const setSearchToSelectKeyword = (value) => ({
  type: SET_SEARCH_TO_SELECT_KEYWORD,
  payload: value,
});

export const setSearchToSelectAdvanced = (condition) => (dispatch, getState) => {
  const recordType = getSearchToSelectRecordType(getState());

  dispatch({
    type: SET_SEARCH_TO_SELECT_ADVANCED,
    payload: condition,
    meta: {
      recordType,
    },
  });
};

export const setSearchToSelectAdvancedLimitBy = (condition) => (dispatch, getState) => {
  const recordType = getSearchToSelectRecordType(getState());

  dispatch({
    type: SET_SEARCH_TO_SELECT_ADVANCED_LIMIT_BY,
    payload: condition,
    meta: {
      searchTermsGroup: SEARCH_TERMS_GROUP_LIMIT_BY,
      recordType,
    },
  });
};

export const setSearchToSelectAdvancedSearchTerms = (condition) => (dispatch, getState) => {
  const recordType = getSearchToSelectRecordType(getState());

  dispatch({
    type: SET_SEARCH_TO_SELECT_ADVANCED_SEARCH_TERMS,
    payload: condition,
    meta: {
      searchTermsGroup: SEARCH_TERMS_GROUP_SEARCH_TERMS,
      recordType,
    },
  });
};

export const setSearchToSelectRecordType = (recordType) => ({
  type: SET_SEARCH_TO_SELECT_RECORD_TYPE,
  payload: recordType,
});

export const setSearchToSelectVocabulary = (vocabulary) => ({
  type: SET_SEARCH_TO_SELECT_VOCABULARY,
  payload: vocabulary,
});
