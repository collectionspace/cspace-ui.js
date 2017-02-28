import { isCsid } from '../helpers/csidHelpers';

import {
  getQuickSearchKeyword,
  getQuickSearchRecordType,
  getQuickSearchVocabulary,
} from '../reducers';

export const SET_QUICK_SEARCH_KEYWORD = 'SET_QUICK_SEARCH_KEYWORD';

export const setQuickSearchKeyword = value => ({
  type: SET_QUICK_SEARCH_KEYWORD,
  payload: value,
});

export const initiateSearch = push => (dispatch, getState) => {
  const keyword = getQuickSearchKeyword(getState());
  const kw = keyword ? keyword.trim() : '';
  const recordType = getQuickSearchRecordType(getState());
  const vocabulary = getQuickSearchVocabulary(getState(), recordType);

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
