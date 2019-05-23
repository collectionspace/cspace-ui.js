import {
  CLEAR_SEARCH_TO_RELATE,
  SET_SEARCH_TO_RELATE_KEYWORD,
  SET_SEARCH_TO_RELATE_ADVANCED,
  SET_SEARCH_TO_RELATE_RECORD_TYPE,
  SET_SEARCH_TO_RELATE_VOCABULARY,
} from '../constants/actionCodes';

export const clearSearchToRelate = () => ({
  type: CLEAR_SEARCH_TO_RELATE,
});

export const setSearchToRelateKeyword = value => ({
  type: SET_SEARCH_TO_RELATE_KEYWORD,
  payload: value,
});

export const setSearchToRelateAdvanced = condition => ({
  type: SET_SEARCH_TO_RELATE_ADVANCED,
  payload: condition,
});

export const setSearchToRelateRecordType = recordType => ({
  type: SET_SEARCH_TO_RELATE_RECORD_TYPE,
  payload: recordType,
});

export const setSearchToRelateVocabulary = vocabulary => ({
  type: SET_SEARCH_TO_RELATE_VOCABULARY,
  payload: vocabulary,
});
