import get from 'lodash/get';
import { getSearchResult, isSearchPending } from '../reducers';
import getSession from './cspace';
import { advancedSearchConditionToNXQL } from '../helpers/searchHelpers';

import {
  ERR_UNKNOWN_RECORD_TYPE,
  ERR_UNKNOWN_VOCABULARY,
  ERR_INVALID_SORT,
  ERR_API,
} from '../constants/errorCodes';

export const CLEAR_SELECTED = 'CLEAR_SELECTED';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const SET_MOST_RECENT_SEARCH = 'SET_MOST_RECENT_SEARCH';
export const CREATE_EMPTY_SEARCH_RESULT = 'CREATE_EMPTY_SEARCH_RESULT';
export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_FULFILLED = 'SEARCH_FULFILLED';
export const SEARCH_REJECTED = 'SEARCH_REJECTED';
export const SET_ALL_RESULT_ITEMS_SELECTED = 'SET_ALL_RESULT_ITEMS_SELECTED';
export const SET_RESULT_ITEM_SELECTED = 'SET_RESULT_ITEM_SELECTED';
export const DESELECT_RESULT_ITEM = 'DESELECT_RESULT_ITEM';

const findColumnByName = (columns, columnName) => {
  if (!columns) return null;

  for (let i = 0; i < columns.length; i += 1) {
    const column = columns[i];

    if (column.name === columnName) {
      return column;
    }
  }

  return null;
};

const getSortParam = (config, searchDescriptor, columnSetName) => {
  const sortSpec = searchDescriptor.searchQuery.sort;
  const [sortColumnName, sortDir] = sortSpec.split(' ');

  if (sortDir && sortDir !== 'desc') {
    return null;
  }

  const columns = get(config, ['recordTypes', searchDescriptor.recordType, 'columns', columnSetName]);
  const column = findColumnByName(columns, sortColumnName);

  if (column && column.sortBy) {
    return (column.sortBy + (sortDir ? ' DESC' : ''));
  }

  return null;
};

export const clearSelected = searchName => ({
  type: CLEAR_SELECTED,
  meta: {
    searchName,
  },
});

export const clearSearchResults = searchName => ({
  type: CLEAR_SEARCH_RESULTS,
  meta: {
    searchName,
  },
});

export const search = (config, searchName, searchDescriptor, listType = 'common', columnSetName = 'default') =>
  (dispatch, getState) => {
    const {
      recordType,
      vocabulary,
      csid,
      subresource,
      searchQuery,
    } = searchDescriptor;

    if (
      isSearchPending(getState(), searchName, searchDescriptor) ||
      getSearchResult(getState(), searchName, searchDescriptor)
    ) {
      // There's already a result for this search. Just set this search to be the most recent.

      return dispatch({
        type: SET_MOST_RECENT_SEARCH,
        meta: {
          searchName,
          searchDescriptor,
        },
      });
    }

    const listTypeConfig = config.listTypes[listType];

    dispatch({
      type: SEARCH_STARTED,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    const recordTypeConfig = config.recordTypes[recordType];

    if (!recordTypeConfig) {
      return dispatch({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_UNKNOWN_RECORD_TYPE,
        },
        meta: {
          searchName,
          searchDescriptor,
        },
      });
    }

    const recordTypeServicePath = get(recordTypeConfig, ['serviceConfig', 'servicePath']);

    if (!recordTypeServicePath) {
      return dispatch({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_UNKNOWN_RECORD_TYPE,
        },
        meta: {
          searchName,
          searchDescriptor,
        },
      });
    }

    const vocabularyServicePath = vocabulary
      ? get(recordTypeConfig, ['vocabularies', vocabulary, 'serviceConfig', 'servicePath'])
      : null;

    if (vocabulary && !vocabularyServicePath) {
      return dispatch({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_UNKNOWN_VOCABULARY,
        },
        meta: {
          searchName,
          searchDescriptor,
        },
      });
    }

    // Check for conditions where we just want to create an empty result.
    // These happen when a new record is being created.

    if (
      // A related record search for an empty csid.

      (searchQuery.rel === '') ||

      // A subresource query without a csid.

      (typeof subresource !== 'undefined' && !searchDescriptor.csid)
    ) {
      return dispatch({
        type: CREATE_EMPTY_SEARCH_RESULT,
        meta: {
          listTypeConfig,
          searchName,
          searchDescriptor,
        },
      });
    }

    const requestConfig = {
      params: {
        as: advancedSearchConditionToNXQL(
          recordTypeConfig.fields, searchQuery.as, config.serverTimeZone
        ),
        csid: searchQuery.csid,
        kw: searchQuery.kw,
        mkRtSbj: searchQuery.mkRtSbj,
        pgNum: searchQuery.p,
        pgSz: searchQuery.size,
        rtSbj: searchQuery.rel,
        wf_deleted: false,
      },
    };

    if (searchQuery.sort) {
      const sortParam = getSortParam(config, searchDescriptor, columnSetName);

      if (!sortParam) {
        return dispatch({
          type: SEARCH_REJECTED,
          payload: {
            code: ERR_INVALID_SORT,
          },
          meta: {
            searchName,
            searchDescriptor,
          },
        });
      }

      requestConfig.params.sortBy = sortParam;
    }

    const pathParts = [recordTypeServicePath];

    if (vocabularyServicePath) {
      pathParts.push(vocabularyServicePath);
      pathParts.push('items');
    }

    if (csid) {
      pathParts.push(csid);
    }

    if (subresource) {
      const subresourceConfig = config.subresources[subresource];
      const subresourceServicePath = subresourceConfig.serviceConfig.servicePath;

      pathParts.push(subresourceServicePath);
    }

    const path = pathParts.join('/');

    return getSession().read(path, requestConfig)
      // Insert an artificial delay for testing.
      // .then(response => new Promise((resolve) => {
      //   window.setTimeout(() => {
      //     resolve(response);
      //   }, 1000);
      // }))
      .then(
        response => dispatch({
          type: SEARCH_FULFILLED,
          payload: response,
          meta: {
            searchName,
            searchDescriptor,
          },
        }),
        error => dispatch({
          type: SEARCH_REJECTED,
          payload: {
            code: ERR_API,
            error,
          },
          meta: {
            searchName,
            searchDescriptor,
          },
        })
      );
  };

export const setResultItemSelected =
  (config, searchName, searchDescriptor, listType = 'common', index, isSelected) => {
    const listTypeConfig = config.listTypes[listType];

    return {
      type: SET_RESULT_ITEM_SELECTED,
      payload: isSelected,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
        index,
      },
    };
  };

export const setAllResultItemsSelected =
  (config, searchName, searchDescriptor, listType = 'common', isSelected, filter) => {
    const listTypeConfig = config.listTypes[listType];

    return {
      type: SET_ALL_RESULT_ITEMS_SELECTED,
      payload: isSelected,
      meta: {
        filter,
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    };
  };

export const deselectResultItem = (searchName, csid) => ({
  type: DESELECT_RESULT_ITEM,
  meta: {
    searchName,
    csid,
  },
});
