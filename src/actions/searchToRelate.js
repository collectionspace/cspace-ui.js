export const SET_SEARCH_TO_RELATE_KEYWORD = 'SET_SEARCH_TO_RELATE_KEYWORD';
export const SET_SEARCH_TO_RELATE_ADVANCED = 'SET_SEARCH_TO_RELATE_ADVANCED';
export const SET_SEARCH_TO_RELATE_RECORD_TYPE = 'SET_SEARCH_TO_RELATE_RECORD_TYPE';
export const SET_SEARCH_TO_RELATE_VOCABULARY = 'SET_SEARCH_TO_RELATE_VOCABULARY';

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
