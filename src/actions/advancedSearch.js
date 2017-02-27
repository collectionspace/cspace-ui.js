import {
  getAdvancedSearchKeyword,
  getAdvancedSearchRecordType,
  getAdvancedSearchVocabulary,
} from '../reducers';

export const SET_ADVANCED_SEARCH_KEYWORD = 'SET_ADVANCED_SEARCH_KEYWORD';

export const setAdvancedSearchKeyword = value => ({
  type: SET_ADVANCED_SEARCH_KEYWORD,
  payload: value,
});

export const initiateSearch = push => (dispatch, getState) => {
  const keyword = getAdvancedSearchKeyword(getState());
  const kw = keyword ? keyword.trim() : '';
  const recordType = getAdvancedSearchRecordType(getState());
  const vocabulary = getAdvancedSearchVocabulary(getState(), recordType);

  const query = {};
  const vocabularyPath = vocabulary ? `/${vocabulary}` : '';
  const pathname = `/list/${recordType}${vocabularyPath}`;

  if (kw) {
    query.kw = kw;
  }

  push({
    pathname,
    query,
  });
};
