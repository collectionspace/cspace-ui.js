import get from 'lodash/get';
import { getSearchResult, isSearchDirty, isSearchPending } from '../reducers';
import getSession from '../helpers/session';
import { convertAdvancedSearchConditionToNXQL, deriveSearchType } from '../helpers/searchHelpers';

import {
  ERR_UNKNOWN_RECORD_TYPE,
  ERR_UNKNOWN_VOCABULARY,
  ERR_INVALID_SORT,
  ERR_API,
} from '../constants/errorCodes';

import {
  CLEAR_SELECTED,
  CLEAR_SEARCH_RESULTS,
  SET_MOST_RECENT_SEARCH,
  CREATE_EMPTY_SEARCH_RESULT,
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
  SET_ALL_RESULT_ITEMS_SELECTED,
  SET_RESULT_ITEM_SELECTED,
  DESELECT_RESULT_ITEM,
} from '../constants/actionCodes';

const toJS = (obj) => ((obj && typeof obj === 'object' && obj.toJS) ? obj.toJS() : obj);

const getSortParam = (config, searchDescriptor, columnSetName) => {
  const sortSpec = searchDescriptor.getIn(['searchQuery', 'sort']);
  const [sortColumnName, sortDir] = sortSpec.split(' ');

  if (sortDir && sortDir !== 'desc') {
    return null;
  }

  // prefer the new sort.js config
  const sort = get(config,
    ['recordTypes', searchDescriptor.get('recordType'), 'sort', sortColumnName]);

  if (sort && sort.sortBy) {
    return sort.sortBy;
  }

  const column = get(config,
    ['recordTypes', searchDescriptor.get('recordType'), 'columns', columnSetName, sortColumnName]);

  if (column && column.sortBy) {
    return (column.sortBy + (sortDir ? ' DESC' : ''));
  }

  return null;
};

export const clearSelected = (searchName) => ({
  type: CLEAR_SELECTED,
  meta: {
    searchName,
  },
});

export const clearSearchResults = (searchName) => ({
  type: CLEAR_SEARCH_RESULTS,
  meta: {
    searchName,
  },
});

/**
 * The search path for each individual service
 * @param {*} csid the csid of the resource, if it exists
 * @param {*} subresource the subresource, if it exists
 * @param {*} config the cspace config
 * @param {*} recordServicePath the service path of the record type
 * @param {*} vocabularyServicePath the service path of vocabulary type
 * @returns
 */
const buildSearchPath = (csid, subresource, config, recordServicePath, vocabularyServicePath) => {
  const pathParts = [recordServicePath];

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

  return pathParts.join('/');
};

/**
 * The search path for the 'advanced search' service
 * @returns
 */
const buildAdvancedSearchPath = () => '/advancedsearch';

/**
 * Build and dispatch a search
 *
 * @param {*} config The cspace configuration
 * @param {*} searchName The search being executed (e.g. SEARCH_RESULT_PAGE_SEARCH_NAME)
 * @param {*} searchDescriptor The search descriptor (record type, query params, etc)
 * @param {*} columnSetName The columns for the view being returned, used for sort fields
 * @returns
 */
export const search = (config, searchName, searchDescriptor, columnSetName = 'default') => (dispatch, getState) => {
  const recordType = searchDescriptor.get('recordType');
  const vocabulary = searchDescriptor.get('vocabulary');
  const csid = searchDescriptor.get('csid');
  const subresource = searchDescriptor.get('subresource');
  const searchQuery = searchDescriptor.get('searchQuery');

  if (
    isSearchPending(getState(), searchName, searchDescriptor)
      || (
        getSearchResult(getState(), searchName, searchDescriptor)
        && !isSearchDirty(getState(), searchName)
      )
  ) {
    // There's already a result for this search. Just set this search to be the most recent.

    dispatch({
      type: SET_MOST_RECENT_SEARCH,
      meta: {
        searchName,
        searchDescriptor,
      },
    });

    return Promise.resolve();
  }

  const {
    listType,
    searchType,
  } = deriveSearchType(config, searchName, searchDescriptor);

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
    dispatch({
      type: SEARCH_REJECTED,
      payload: {
        code: ERR_UNKNOWN_RECORD_TYPE,
      },
      meta: {
        searchName,
        searchDescriptor,
      },
    });

    return Promise.reject();
  }

  const recordTypeServicePath = get(recordTypeConfig, ['serviceConfig', 'servicePath']);

  if (!recordTypeServicePath) {
    dispatch({
      type: SEARCH_REJECTED,
      payload: {
        code: ERR_UNKNOWN_RECORD_TYPE,
      },
      meta: {
        searchName,
        searchDescriptor,
      },
    });

    return Promise.reject();
  }

  const vocabularyServicePath = vocabulary
    ? get(recordTypeConfig, ['vocabularies', vocabulary, 'serviceConfig', 'servicePath'])
    : null;

  if (vocabulary && !vocabularyServicePath) {
    dispatch({
      type: SEARCH_REJECTED,
      payload: {
        code: ERR_UNKNOWN_VOCABULARY,
      },
      meta: {
        searchName,
        searchDescriptor,
      },
    });

    return Promise.reject();
  }

  // Check for conditions where we just want to create an empty result.
  // These happen when a new record is being created.

  if (
  // A related record search for an empty csid.

    (searchQuery.get('rel') === '')

    // A subresource query without a csid.

      || (typeof subresource !== 'undefined' && !searchDescriptor.get('csid'))
  ) {
    dispatch({
      type: CREATE_EMPTY_SEARCH_RESULT,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    return Promise.resolve();
  }

  const nxql = convertAdvancedSearchConditionToNXQL(recordTypeConfig.fields, searchQuery.get('as'));

  const requestConfig = {
    params: {
      as: nxql ? `(${nxql})` : undefined,
      csid: searchQuery.get('csid'),
      doctype: searchQuery.get('doctype'),
      kw: searchQuery.get('kw'),
      mkRtSbj: searchQuery.get('mkRtSbj'),
      mode: toJS(searchQuery.get('mode')),
      pgNum: searchQuery.get('p'),
      pgSz: searchQuery.get('size'),
      rtSbj: searchQuery.get('rel'),
      rtPredicate: searchQuery.get('relType'),
      servicetag: searchQuery.get('serviceTag'),
      sn: searchQuery.get('sn'), // accounts screen name
      dn: searchQuery.get('dn'), // role display name
      wf_deleted: false,
    },
  };

  if (searchQuery.get('sort')) {
    const sortParam = getSortParam(config, searchDescriptor, columnSetName);

    console.log(`sort ${searchQuery.get('sort')} :: ${sortParam}`);
    if (!sortParam) {
      dispatch({
        type: SEARCH_REJECTED,
        payload: {
          code: ERR_INVALID_SORT,
        },
        meta: {
          searchName,
          searchDescriptor,
        },
      });

      return Promise.reject();
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

  const path = searchType === 'advanced'
    ? buildAdvancedSearchPath()
    : buildSearchPath(csid, subresource, config, recordTypeServicePath, vocabularyServicePath);

  return getSession().read(path, requestConfig)
  // Insert an artificial delay for testing.
  // .then(response => new Promise((resolve) => {
  //   window.setTimeout(() => {
  //     resolve(response);
  //   }, 1000);
  // }))
    .then((response) => dispatch({
      type: SEARCH_FULFILLED,
      payload: response,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    }))
    .catch((error) => dispatch({
      type: SEARCH_REJECTED,
      payload: {
        code: ERR_API,
        error,
      },
      meta: {
        searchName,
        searchDescriptor,
      },
    }));
};

const validFieldNamePattern = /^[a-zA-Z_]+:[a-zA-Z_]+$/;

const validateFieldName = (asFieldName) => validFieldNamePattern.test(asFieldName);

export const findFirst = (config, recordType, asFieldName, asValue) => {
  if (!validateFieldName(asFieldName)) {
    return Promise.reject();
  }

  const value = asValue.replaceAll('"', '\\"');

  const requestConfig = {
    params: {
      as: `(${asFieldName} = "${value}")`,
      pgSz: 1,
      wf_deleted: false,
    },
  };

  const recordTypeConfig = config.recordTypes[recordType];

  if (!recordTypeConfig) {
    return Promise.reject();
  }

  const recordTypeServicePath = get(recordTypeConfig, ['serviceConfig', 'servicePath']);

  if (!recordTypeServicePath) {
    return Promise.reject();
  }

  const pathParts = [recordTypeServicePath];
  const serviceType = get(recordTypeConfig, ['serviceConfig', 'serviceType']);

  if (serviceType === 'authority') {
    const vocabularyServicePath = get(recordTypeConfig, ['vocabularies', 'all', 'serviceConfig', 'servicePath']);

    if (!vocabularyServicePath) {
      return Promise.reject();
    }

    pathParts.push(vocabularyServicePath);
    pathParts.push('items');
  }

  const path = pathParts.join('/');

  return getSession().read(path, requestConfig);
};

export const searchCsid = (config, recordType, csid) => () => (
  findFirst(config, recordType, 'ecm:name', csid)
);

export const setResultItemSelected = (config, searchName, searchDescriptor, listType = 'common', index, isSelected) => {
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

export const setAllResultItemsSelected = (config, searchName, searchDescriptor, listType = 'common', isSelected, filter) => {
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
