import get from 'lodash/get';
import qs from 'qs';

import Immutable from 'immutable';
import {
  getSearchPageAdvanced,
  getSearchPageAdvancedLimitBy,
  getSearchPageAdvancedSearchTerms,
  getSearchPageKeyword,
  getSearchPageRecordType,
  getSearchPageVocabulary,
  getUseNewSearch,
} from '../reducers';

import { normalizeCondition } from '../helpers/searchHelpers';

import {
  CLEAR_SEARCH_PAGE,
  SET_SEARCH_PAGE_KEYWORD,
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_PAGE_ADVANCED_LIMIT_BY,
  SET_SEARCH_PAGE_ADVANCED_SEARCH_TERMS,
} from '../constants/actionCodes';
import { OP_AND } from '../constants/searchOperators';
import {
  SEARCH_TERMS_GROUP_LIMIT_BY,
  SEARCH_TERMS_GROUP_SEARCH_TERMS,
} from '../constants/searchNames';

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

export const setSearchPageAdvancedLimitBy = (condition) => (dispatch, getState) => {
  const recordType = getSearchPageRecordType(getState());

  dispatch({
    type: SET_SEARCH_PAGE_ADVANCED_LIMIT_BY,
    payload: condition,
    meta: {
      searchTermsGroup: SEARCH_TERMS_GROUP_LIMIT_BY,
      recordType,
    },
  });
};

export const setSearchPageAdvancedSearchTerms = (condition) => (dispatch, getState) => {
  const recordType = getSearchPageRecordType(getState());

  dispatch({
    type: SET_SEARCH_PAGE_ADVANCED_SEARCH_TERMS,
    payload: condition,
    meta: {
      searchTermsGroup: SEARCH_TERMS_GROUP_SEARCH_TERMS,
      recordType,
    },
  });
};

const buildAdvancedSearchCondition = (
  useNewSearch,
  advancedLimitBy,
  advancedSearchTerms,
  advanced,
) => {
  if (useNewSearch || typeof useNewSearch === 'undefined') {
    if (advancedLimitBy == null) {
      return advancedSearchTerms;
    }
    return Immutable.Map({
      op: OP_AND,
      value: Immutable.List.of(
        advancedSearchTerms,
        advancedLimitBy,
      ),
    });
  }
  return advanced;
};

export const initiateSearch = (config, push) => (dispatch, getState) => {
  const state = getState();

  const recordType = getSearchPageRecordType(state);
  const vocabulary = getSearchPageVocabulary(state, recordType);
  const keyword = getSearchPageKeyword(state);
  const useNewSearch = getUseNewSearch(state);
  const query = {};
  const vocabularyPath = vocabulary ? `/${vocabulary}` : '';
  const pathname = `/list/${recordType}${vocabularyPath}`;

  const kw = keyword ? keyword.trim() : '';

  if (kw) {
    query.kw = kw;
  }

  const advancedSearchTerms = getSearchPageAdvancedSearchTerms(state);
  const advancedLimitBy = getSearchPageAdvancedLimitBy(state);
  const advanced = getSearchPageAdvanced(state);
  const advancedSearchCondition = buildAdvancedSearchCondition(
    useNewSearch,
    advancedLimitBy,
    advancedSearchTerms,
    advanced,
  );

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
