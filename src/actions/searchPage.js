import get from 'lodash/get';
import qs from 'qs';

import {
  getSearchPageAdvanced,
  getSearchPageKeyword,
  getSearchPageRecordType,
  getSearchPageVocabulary,
} from '../reducers';

import { normalizeCondition } from '../helpers/searchHelpers';

import {
  CLEAR_SEARCH_PAGE,
  SET_SEARCH_PAGE_KEYWORD,
  SET_SEARCH_PAGE_ADVANCED,
} from '../constants/actionCodes';

export const clearSearchPage = () => ({
  type: CLEAR_SEARCH_PAGE,
});

export const setSearchPageKeyword = (value) => ({
  type: SET_SEARCH_PAGE_KEYWORD,
  payload: value,
});

export const setSearchPageAdvanced = (condition) => (dispatch, getState) => {
  const recordType = getSearchPageRecordType(getState());

  dispatch({
    type: SET_SEARCH_PAGE_ADVANCED,
    payload: condition,
    meta: {
      recordType,
    },
  });
};

export const initiateSearch = (config, push) => (dispatch, getState) => {
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

  const fields = get(config, ['recordTypes', recordType, 'fields']);
  const condition = normalizeCondition(fields, advancedSearchCondition);

  if (condition) {
    query.as = JSON.stringify(condition.toJS());
  }

  const queryString = qs.stringify(query);

  push({
    pathname,
    search: `?${queryString}`,
    state: {
      originSearchPage: {
        // Keep the search descriptor a plain object, not an Immutable, so that it can be stored in
        // location state.
        searchDescriptor: {
          recordType,
          vocabulary,
          searchQuery: {
            as: advancedSearchCondition && advancedSearchCondition.toJS(),
            kw: keyword,
          },
        },
      },
    },
  });
};
