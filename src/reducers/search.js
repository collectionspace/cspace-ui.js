import Immutable from 'immutable';

import {
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
} from '../actions/search';

const searchKey = searchDescriptor => JSON.stringify(searchDescriptor);

const handleSearchStarted = (state, action) => {
  const searchDescriptor = action.meta;
  const key = searchKey(searchDescriptor);

  if (state.hasIn(['byKey', key]) && !state.getIn(['byKey', key, 'error'])) {
    // Already have a non-error search state for this search descriptor. Do nothing.

    return state;
  }

  const mostRecentKey = state.get('mostRecentKey');

  let updatedState = state;
  let result = null;

  if (mostRecentKey) {
    const mostRecentSearchState = state.getIn(['byKey', mostRecentKey]);
    const mostRecentSearchDescriptor = mostRecentSearchState.get('descriptor');

    if (
      mostRecentSearchDescriptor.get('recordType') !== searchDescriptor.recordType ||
      mostRecentSearchDescriptor.get('vocabulary') !== searchDescriptor.vocabulary ||
      mostRecentSearchDescriptor.getIn(['searchQuery', 'kw']) !== searchDescriptor.searchQuery.kw ||
      mostRecentSearchDescriptor.getIn(['searchQuery', 'size']) !== searchDescriptor.searchQuery.size
    ) {
      // Something other than the page number and/or sort direction changed from the last search.
      // Clear out stored search states. (If only the page number and/or sort direction changed,
      // keep the previous states around as a cache so that flipping between pages or sort
      // directions will be fast.)

      // TODO: Might want to clear states when sort direction changes. Or just keep the current
      // page, so flipping sort dir on the current page will still be fast.

      updatedState = state.set('byKey', Immutable.Map());
    } else {
      // Only the page number and/or sort direction changed from the last search. Seed the search
      // state with a blank result that has the same number of total items as the last search, and
      // the page num/page size of this search. This allows a blank result table to be rendered
      // while the search is pending, preventing a big flash of empty content.

      const totalItems = mostRecentSearchState.getIn([
        'result', 'ns2:abstract-common-list', 'totalItems',
      ]);

      if (totalItems) {
        result = Immutable.fromJS({
          'ns2:abstract-common-list': {
            totalItems,
            pageNum: searchDescriptor.searchQuery.p,
            pageSize: searchDescriptor.searchQuery.size,
          },
        });
      }
    }
  }

  const searchState = Immutable.fromJS({
    result,
    descriptor: action.meta,
    isPending: true,
  });

  return updatedState
    .set('mostRecentKey', key)
    .setIn(['byKey', key], searchState);
};

const handleSearchFulfilled = (state, action) => {
  const key = searchKey(action.meta);

  if (state.hasIn(['byKey', key])) {
    return state.setIn(['byKey', key], state.getIn(['byKey', key])
      .set('isPending', false)
      .set('result', Immutable.fromJS(action.payload.data))
      .delete('error')
    );
  }

  return state;
};

const handleSearchRejected = (state, action) => {
  const key = searchKey(action.meta);

  if (state.hasIn(['byKey', key])) {
    return state.setIn(['byKey', key], state.getIn(['byKey', key])
      .set('isPending', false)
      .set('error', Immutable.fromJS(action.payload))
      .delete('result')
    );
  }

  return state;
};

export default (state = Immutable.fromJS({ mostRecentKey: null, byKey: {} }), action) => {
  switch (action.type) {
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

export function isPending(state, searchDescriptor) {
  return state.getIn(['byKey', searchKey(searchDescriptor), 'isPending']);
}

export function getResult(state, searchDescriptor) {
  return state.getIn(['byKey', searchKey(searchDescriptor), 'result']);
}

export function getError(state, searchDescriptor) {
  return state.getIn(['byKey', searchKey(searchDescriptor), 'error']);
}
