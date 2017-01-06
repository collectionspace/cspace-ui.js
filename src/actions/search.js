import get from 'lodash/get';

import getSession from './cspace';

export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_FULFILLED = 'SEARCH_FULFILLED';
export const SEARCH_REJECTED = 'SEARCH_REJECTED';

export const ERR_NO_RECORD_SERVICE = 'ERR_NO_RECORD_SERVICE';
export const ERR_NO_VOCABULARY_SERVICE = 'ERR_NO_VOCABULARY_SERVICE';
;
export const search = (recordTypeConfig, vocabularyName, searchQuery) => (dispatch) => {
  const recordTypeServicePath = recordTypeConfig.serviceConfig.servicePath;

  if (!recordTypeServicePath) {
    return {
      type: SEARCH_REJECTED,
      payload: ERR_NO_RECORD_SERVICE,
      meta: {
        recordTypeConfig,
        vocabularyName,
        searchQuery,
      },
    };
  }

  const vocabularyServicePath = vocabularyName
    ? get(recordTypeConfig, ['vocabularies', vocabularyName, 'serviceConfig', 'servicePath'])
    : null;

  if (vocabularyName && !vocabularyServicePath) {
    return {
      type: SEARCH_REJECTED,
      payload: ERR_NO_VOCABULARY_SERVICE,
      meta: {
        recordTypeConfig,
        vocabularyName,
        searchQuery,
      },
    };
  }

  dispatch({
    type: SEARCH_STARTED,
    meta: {
      recordTypeConfig,
      vocabularyName,
      searchQuery,
    },
  });

  const {
    pgNum,
    ...remainingSearchQueryParams,
  } = searchQuery;

  const config = {
    params: {
      ...remainingSearchQueryParams,
      pgNum: pgNum - 1,
      wf_deleted: false,
    },
  };

  const vocabularyItemsPath = vocabularyServicePath ? `/${vocabularyServicePath}/items` : '';
  const path = `${recordTypeServicePath}${vocabularyItemsPath}`;

  return getSession().read(path, config)
    .then(response => dispatch({
      type: SEARCH_FULFILLED,
      payload: response,
      meta: {
        recordTypeConfig,
        vocabularyName,
        searchQuery,
      },
    }))
    .catch(error => dispatch({
      type: SEARCH_REJECTED,
      payload: error,
      meta: {
        recordTypeConfig,
        vocabularyName,
        searchQuery,
      },
    }));
};
