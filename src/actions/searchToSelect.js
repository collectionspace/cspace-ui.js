import {
  CLEAR_SEARCH_TO_SELECT,
  SET_SEARCH_TO_SELECT_KEYWORD,
  SET_SEARCH_TO_SELECT_ADVANCED,
  SET_SEARCH_TO_SELECT_RECORD_TYPE,
  SET_SEARCH_TO_SELECT_VOCABULARY,
} from '../constants/actionCodes';

export const clearSearchToSelect = () => ({
  type: CLEAR_SEARCH_TO_SELECT,
});

export const setSearchToSelectKeyword = value => ({
  type: SET_SEARCH_TO_SELECT_KEYWORD,
  payload: value,
});

export const setSearchToSelectAdvanced = condition => ({
  type: SET_SEARCH_TO_SELECT_ADVANCED,
  payload: condition,
});

export const setSearchToSelectRecordType = recordType => ({
  type: SET_SEARCH_TO_SELECT_RECORD_TYPE,
  payload: recordType,
});

export const setSearchToSelectVocabulary = vocabulary => ({
  type: SET_SEARCH_TO_SELECT_VOCABULARY,
  payload: vocabulary,
});
