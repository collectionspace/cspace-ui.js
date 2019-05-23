import qs from 'qs';
import { isCsid } from '../helpers/csidHelpers';

import {
  getQuickSearchKeyword,
  getQuickSearchRecordType,
  getQuickSearchVocabulary,
} from '../reducers';

import {
  SET_QUICK_SEARCH_KEYWORD,
} from '../constants/actionCodes';

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
  let search;

  const vocabularyPath = vocabulary ? `/${vocabulary}` : '';

  if (isCsid(kw)) {
    // Go straight to the record with the csid.

    pathname = `/record/${recordType}${vocabularyPath}/${kw}`;
  } else {
    pathname = `/list/${recordType}${vocabularyPath}`;

    if (kw) {
      const query = {
        kw,
      };

      const queryString = qs.stringify(query);

      search = `?${queryString}`;
    }
  }

  push({
    pathname,
    search,
  });
};
