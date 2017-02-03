import { isCsid } from '../helpers/csidHelpers';

import {
  getKeywordSearchKeyword,
  getKeywordSearchRecordType,
  getKeywordSearchVocabulary,
} from '../reducers';

export const SET_KEYWORD_SEARCH_KEYWORD = 'SET_KEYWORD_SEARCH_KEYWORD';

export const setKeywordSearchKeyword = value => ({
  type: SET_KEYWORD_SEARCH_KEYWORD,
  payload: value,
});

export const initiateSearch = push => (dispatch, getState) => {
  const keyword = getKeywordSearchKeyword(getState());
  const kw = keyword ? keyword.trim() : '';
  const recordType = getKeywordSearchRecordType(getState());
  const vocabulary = getKeywordSearchVocabulary(getState(), recordType);

  let pathname;

  const vocabularyPath = vocabulary ? `/${vocabulary}` : '';
  const query = {};

  if (isCsid(kw)) {
    // Go straight to the record with the csid.

    pathname = `/record/${recordType}${vocabularyPath}/${kw}`;
  } else {
    pathname = `/list/${recordType}${vocabularyPath}`;

    if (kw) {
      query.kw = kw;
    }
  }

  push({
    pathname,
    query,
  });
};
