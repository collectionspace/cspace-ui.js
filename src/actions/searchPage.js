import {
  getSearchPageAdvanced,
  getSearchPageKeyword,
  getSearchPageRecordType,
  getSearchPageVocabulary,
} from '../reducers';

import { normalizeCondition } from '../helpers/searchHelpers';

export const SET_SEARCH_PAGE_KEYWORD = 'SET_SEARCH_PAGE_KEYWORD';
export const SET_SEARCH_PAGE_ADVANCED = 'SET_SEARCH_PAGE_ADVANCED';

export const setSearchPageKeyword = value => ({
  type: SET_SEARCH_PAGE_KEYWORD,
  payload: value,
});

export const setSearchPageAdvanced = condition => ({
  type: SET_SEARCH_PAGE_ADVANCED,
  payload: condition,
});

export const initiateSearch = push => (dispatch, getState) => {
  const state = getState();

  const recordType = getSearchPageRecordType(state);
  const vocabulary = getSearchPageVocabulary(state, recordType);
  const keyword = getSearchPageKeyword(state);
  const advancedSearchCondition = getSearchPageAdvanced(state);

  const query = {};
  const vocabularyPath = vocabulary ? `/${vocabulary}` : '';
  const pathname = `/list/${recordType}${vocabularyPath}`;

  const kw = keyword ? keyword.trim() : '';

  if (kw) {
    query.kw = kw;
  }

  const condition = normalizeCondition(advancedSearchCondition);

  if (condition) {
    query.as = JSON.stringify(condition.toJS());
  }

  push({
    pathname,
    query,
  });
};
