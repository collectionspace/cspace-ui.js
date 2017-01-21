import get from 'lodash/get';
import { isSearchPending, getSearchResult } from '../reducers';
import getSession from './cspace';

export const SET_MOST_RECENT_SEARCH = 'SET_MOST_RECENT_SEARCH';
export const CREATE_EMPTY_SEARCH_RESULT = 'CREATE_EMPTY_SEARCH_RESULT';
export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_FULFILLED = 'SEARCH_FULFILLED';
export const SEARCH_REJECTED = 'SEARCH_REJECTED';

export const ERR_NO_RECORD_SERVICE = 'ERR_NO_RECORD_SERVICE';
export const ERR_NO_VOCABULARY_SERVICE = 'ERR_NO_VOCABULARY_SERVICE';
export const ERR_INVALID_SORT = 'ERR_INVALID_SORT';
export const ERR_API = 'ERR_API';

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

const getSortParam = (config, searchDescriptor) => {
  const sortSpec = searchDescriptor.searchQuery.sort;
  const [sortColumnName, sortDir] = sortSpec.split(' ');

  if (sortDir && sortDir !== 'desc') {
    return null;
  }

  const columns = get(config, ['recordTypes', searchDescriptor.recordType, 'columns', 'search']);
  const column = findColumnByName(columns, sortColumnName);

  if (column && column.sortBy) {
    return (column.sortBy + (sortDir ? ' DESC' : ''));
  }

  return null;
};

export const search = (config, searchName, searchDescriptor) => (dispatch, getState) => {
  const {
    recordType,
    vocabulary,
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

  dispatch({
    type: SEARCH_STARTED,
    meta: {
      searchName,
      searchDescriptor,
    },
  });

  const recordTypeConfig = config.recordTypes[recordType];

  if (!recordTypeConfig) {
    return dispatch({
      type: SEARCH_REJECTED,
      payload: {
        code: ERR_NO_RECORD_SERVICE,
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
        code: ERR_NO_RECORD_SERVICE,
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
        code: ERR_NO_VOCABULARY_SERVICE,
      },
      meta: {
        searchName,
        searchDescriptor,
      },
    });
  }

  if (searchQuery.rel === '') {
    // A related record search for an empty csid. This happens when a new record is being created.
    // Just create an empty result.

    return dispatch({
      type: CREATE_EMPTY_SEARCH_RESULT,
      meta: {
        searchName,
        searchDescriptor,
      },
    });
  }

  const requestConfig = {
    params: {
      kw: searchQuery.kw,
      pgNum: searchQuery.p,
      pgSz: searchQuery.size,
      rtSbj: searchQuery.rel,
      wf_deleted: false,
    },
  };

  if (searchQuery.sort) {
    const sortParam = getSortParam(config, searchDescriptor);

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

  const vocabularyItemsPath = vocabularyServicePath ? `/${vocabularyServicePath}/items` : '';
  const path = `${recordTypeServicePath}${vocabularyItemsPath}`;

  return getSession().read(path, requestConfig)
    // Insert an artificial delay for testing.
    // .then(response => {
    //   return new Promise((resolve) => {
    //     window.setTimeout(() => {
    //       resolve(response);
    //     }, 1000);
    //   });
    // })
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
