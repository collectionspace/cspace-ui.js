import {
  getKeywordSearchKeyword,
  getKeywordSearchRecordType,
  getKeywordSearchVocabulary,
} from '../reducers';

export const SET_KEYWORD_SEARCH_KEYWORD = 'SET_KEYWORD_SEARCH_KEYWORD';
export const SET_KEYWORD_SEARCH_RECORD_TYPE = 'SET_KEYWORD_SEARCH_RECORD_TYPE';
export const SET_KEYWORD_SEARCH_VOCABULARY = 'SET_KEYWORD_SEARCH_VOCABULARY';

export const setKeywordSearchKeyword = value => ({
  type: SET_KEYWORD_SEARCH_KEYWORD,
  payload: value,
});

export const setKeywordSearchRecordType = value => ({
  type: SET_KEYWORD_SEARCH_RECORD_TYPE,
  payload: value,
});

export const setKeywordSearchVocabulary = value => ({
  type: SET_KEYWORD_SEARCH_VOCABULARY,
  payload: value,
});

export const initiateSearch = push => (dispatch, getState) => {
  const kw = getKeywordSearchKeyword(getState());
  const recordType = getKeywordSearchRecordType(getState());
  const vocabulary = getKeywordSearchVocabulary(getState());

  const vocabularyPath = vocabulary ? `/${vocabulary}` : '';
  const pathname = `/search/${recordType}${vocabularyPath}`;

  push({
    pathname,
    query: {
      kw,
    },
  });
};
