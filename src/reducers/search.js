import Immutable from 'immutable';
import { asPairs, diff } from '../helpers/objectHelpers';

import {
  SET_MOST_RECENT_SEARCH,
  CREATE_EMPTY_SEARCH_RESULT,
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
} from '../actions/search';

/**
 * Generates a search key for a given search descriptor. All search descriptors that represent the
 * same search should have the same search key.
 */
export const searchKey = (searchDescriptor) => {
  // First convert the search descriptor to an array of name/value pairs, sorted by name. This
  // ensures that the key is not sensitive to the order in which properties are iterated out of the
  // search descriptor object.

  const pairs = asPairs(searchDescriptor);

  // Serialize the name/value pairs to JSON.

  return JSON.stringify(pairs);
};

const handleSetMostRecentSearch = (state, action) => {
  const {
    searchName,
    searchDescriptor,
  } = action.meta;

  const key = searchKey(searchDescriptor);
  const namedSearch = state.get(searchName);

  if (namedSearch && namedSearch.getIn(['byKey', key])) {
    return state.set(searchName, namedSearch.set('mostRecentKey', key));
  }

  return state;
};

const handleSearchStarted = (state, action) => {
  const {
    searchName,
    searchDescriptor,
  } = action.meta;

  const namedSearch = state.get(searchName) || Immutable.Map();

  const key = searchKey(searchDescriptor);
  const mostRecentKey = namedSearch.get('mostRecentKey');

  let updatedNamedSearch = namedSearch;
  let result = null;
  let itemsInPage = null;
  let totalItems = null;

  if (mostRecentKey) {
    const mostRecentSearchState = namedSearch.getIn(['byKey', mostRecentKey]);
    const mostRecentSearchDescriptor = mostRecentSearchState.get('descriptor');

    const changes = diff(searchDescriptor, mostRecentSearchDescriptor.toJS());
    const changeCount = Object.keys(changes).length;

    const pageChanged = 'searchQuery.p' in changes;
    const sortChanged = 'searchQuery.sort' in changes;

    if (pageChanged && changeCount === 1) {
      // Only the page number changed from the last search. Seed these results with the total items
      // count from the previous results, since it probably will remain the same. This allows the
      // UI to render a smooth transition from this page to the next, without the count information
      // and pager blinking out.

      totalItems = mostRecentSearchState.getIn([
        'result', 'ns2:abstract-common-list', 'totalItems',
      ]);
    } else if (sortChanged && changeCount === 1) {
      // Only the sort changed from the last search. As above, seed these results with the total
      // items count. Also seed the itemsInPage count, since this is not expected to change.

      totalItems = mostRecentSearchState.getIn([
        'result', 'ns2:abstract-common-list', 'totalItems',
      ]);

      itemsInPage = mostRecentSearchState.getIn([
        'result', 'ns2:abstract-common-list', 'itemsInPage',
      ]);

      // Clear out stored search states.

      updatedNamedSearch = namedSearch.set('byKey', Immutable.Map());
    } else {
      // Something other than the page number changed from the last search. Clear out stored
      // search states. (If only the page number changed, keep the previous states around as a
      // cache so that flipping between pages will be fast.)

      updatedNamedSearch = namedSearch.set('byKey', Immutable.Map());
    }
  }

  // Seed the search state with a blank result that has the page num and size of this search, and
  // the total items and items in page counts from the last search, if they're not expected to
  // change. This allows a blank result table to be rendered while the search is pending,
  // preventing a flash of empty content.

  const { p, size } = searchDescriptor.searchQuery;

  const pageNum = (typeof p === 'number') ? p.toString() : p;
  const pageSize = (typeof size === 'number') ? size.toString() : size;

  result = Immutable.fromJS({
    'ns2:abstract-common-list': {
      itemsInPage,
      totalItems,
      pageNum,
      pageSize,
    },
  });

  updatedNamedSearch = updatedNamedSearch
    .set('mostRecentKey', key)
    .setIn(['byKey', key], Immutable.fromJS({
      result,
      descriptor: searchDescriptor,
      isPending: true,
    }));

  return state.set(searchName, updatedNamedSearch);
};

const setSearchResult = (state, searchName, searchDescriptor, result) => {
  const namedSearch = state.get(searchName);
  const key = searchKey(searchDescriptor);

  if (namedSearch && namedSearch.hasIn(['byKey', key])) {
    const searchState = namedSearch.getIn(['byKey', key]);

    const updatedSearchState =
      searchState
        .set('isPending', false)
        .set('result', result)
        .delete('error');

    const updatedNamedSearch = namedSearch.setIn(['byKey', key], updatedSearchState);

    return state.set(searchName, updatedNamedSearch);
  }

  return state;
};

const handleCreateEmptySearchResult = (state, action) => {
  const {
    searchName,
    searchDescriptor,
  } = action.meta;

  const { p, size } = searchDescriptor.searchQuery;

  const pageNum = (typeof p === 'number') ? p.toString() : p;
  const pageSize = (typeof size === 'number') ? size.toString() : size;

  const result = Immutable.fromJS({
    'ns2:abstract-common-list': {
      itemsInPage: '0',
      totalItems: '0',
      pageNum,
      pageSize,
    },
  });

  return setSearchResult(state, searchName, searchDescriptor, result);
};

const handleSearchFulfilled = (state, action) => {
  const {
    searchName,
    searchDescriptor,
  } = action.meta;

  return setSearchResult(
    state, searchName, searchDescriptor, Immutable.fromJS(action.payload.data)
  );
};

const handleSearchRejected = (state, action) => {
  const {
    searchName,
    searchDescriptor,
  } = action.meta;

  const namedSearch = state.get(searchName);
  const key = searchKey(searchDescriptor);

  if (namedSearch && namedSearch.hasIn(['byKey', key])) {
    const updatedNamedSearch = namedSearch.setIn(['byKey', key], namedSearch.getIn(['byKey', key])
      .set('isPending', false)
      .set('error', Immutable.fromJS(action.payload))
      .delete('result')
    );

    return state.set(searchName, updatedNamedSearch);
  }

  return state;
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_MOST_RECENT_SEARCH:
      return handleSetMostRecentSearch(state, action);
    case CREATE_EMPTY_SEARCH_RESULT:
      return handleCreateEmptySearchResult(state, action);
    case SEARCH_STARTED:
      return handleSearchStarted(state, action);
    case SEARCH_FULFILLED:
      return handleSearchFulfilled(state, action);
    case SEARCH_REJECTED:
      return handleSearchRejected(state, action);
    default:
      return state;
  }
};

export function isPending(state, searchName, searchDescriptor) {
  return state.getIn([searchName, 'byKey', searchKey(searchDescriptor), 'isPending']);
}

export function getResult(state, searchName, searchDescriptor) {
  return state.getIn([searchName, 'byKey', searchKey(searchDescriptor), 'result']);
}

export function getError(state, searchName, searchDescriptor) {
  return state.getIn([searchName, 'byKey', searchKey(searchDescriptor), 'error']);
}
