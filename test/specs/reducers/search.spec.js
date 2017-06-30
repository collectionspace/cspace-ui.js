import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  CLEAR_SEARCH_RESULTS,
  CREATE_EMPTY_SEARCH_RESULT,
  SET_MOST_RECENT_SEARCH,
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
  SET_RESULT_ITEM_SELECTED,
  CLEAR_SELECTED,
  DESELECT_RESULT_ITEM,
  SET_ALL_RESULT_ITEMS_SELECTED,
} from '../../../src/actions/search';

import reducer, {
  getError,
  getResult,
  isPending,
  searchKey,
  getIndexesByCsid,
  getSelectedItems,
  getMostRecentDescriptor,
  getState,
} from '../../../src/reducers/search';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

describe('search reducer', function suite() {
  const searchName = 'testSearch';

  const listTypeConfig = {
    listNodeName: 'ns2:abstract-common-list',
    itemNodeName: 'list-item',
  };

  it('should have immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map());
  });

  it('should handle SEARCH_STARTED', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {
        p: 0,
        size: 3,
      },
    });

    const key = searchKey(searchDescriptor);

    const state = reducer(undefined, {
      type: SEARCH_STARTED,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            descriptor: searchDescriptor,
            isPending: true,
            result: {
              'ns2:abstract-common-list': {
                itemsInPage: null,
                totalItems: null,
                pageNum: '0',
                pageSize: '3',
                'list-item': null,
              },
            },
          },
        },
      },
    }));

    isPending(state, searchName, searchDescriptor).should.equal(true);
    getMostRecentDescriptor(state, searchName).should.equal(searchDescriptor);
  });

  it('should clear all search states on SEARCH_STARTED when the new search is not only a page change', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'group',
      searchQuery: {},
    });

    const key = searchKey(searchDescriptor);

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: 'somekey',
        byKey: {
          somekey: {
            descriptor: {
              recordType: 'collectionobject',
            },
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_STARTED,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.getIn([searchName, 'mostRecentKey']).should.equal(key);
    state.getIn([searchName, 'byKey']).size.should.equal(1);
  });

  it('should seed the search result on SEARCH_STARTED when the new search is only a page change', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {
        p: '2',
        size: '10',
      },
    });

    const key = searchKey(searchDescriptor);

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: 'somekey',
        byKey: {
          somekey: {
            descriptor: {
              recordType: 'collectionobject',
              searchQuery: {
                p: '1',
                size: '10',
              },
            },
            result: {
              'ns2:abstract-common-list': {
                totalItems: '22',
              },
            },
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_STARTED,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.getIn([searchName, 'mostRecentKey']).should.equal(key);
    state.getIn([searchName, 'byKey', key, 'result', 'ns2:abstract-common-list', 'totalItems']).should.equal('22');
  });

  it('should seed the search result on SEARCH_STARTED when the new search is only a sort change', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {
        p: '0',
        size: '10',
        sort: 'title desc',
      },
    });

    const key = searchKey(searchDescriptor);

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: 'somekey',
        byKey: {
          somekey: {
            descriptor: {
              recordType: 'collectionobject',
              searchQuery: {
                p: '0',
                size: '10',
                sort: 'title',
              },
            },
            result: {
              'ns2:abstract-common-list': {
                itemsInPage: '10',
                totalItems: '22',
              },
            },
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_STARTED,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.getIn([searchName, 'mostRecentKey']).should.equal(key);
    state.getIn([searchName, 'byKey', key, 'result', 'ns2:abstract-common-list', 'itemsInPage']).should.equal('10');
    state.getIn([searchName, 'byKey', key, 'result', 'ns2:abstract-common-list', 'totalItems']).should.equal('22');
  });

  it('should seed the search result on SEARCH_STARTED when the new search is only a seq id change', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {
        p: '0',
        size: '10',
      },
      seqID: '2',
    });

    const key = searchKey(searchDescriptor);

    const items = Immutable.fromJS([{
      uri: '/collectionobjects/1234',
    }]);

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: 'somekey',
        byKey: {
          somekey: {
            descriptor: {
              recordType: 'collectionobject',
              searchQuery: {
                p: '0',
                size: '10',
              },
              seqID: '1',
            },
            result: {
              'ns2:abstract-common-list': {
                itemsInPage: '10',
                totalItems: '22',
                'list-item': items,
              },
            },
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_STARTED,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.getIn([searchName, 'mostRecentKey']).should.equal(key);
    state.getIn([searchName, 'byKey', key, 'result', 'ns2:abstract-common-list', 'itemsInPage']).should.equal('10');
    state.getIn([searchName, 'byKey', key, 'result', 'ns2:abstract-common-list', 'totalItems']).should.equal('22');

    state.getIn([searchName, 'byKey', key, 'result', 'ns2:abstract-common-list', 'list-item']).should
      .equal(items);
  });

  it('should handle SET_MOST_RECENT_SEARCH', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {},
    });

    const key = searchKey(searchDescriptor);

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: 'something',
        byKey: {
          [key]: {
            descriptor: searchDescriptor,
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: SET_MOST_RECENT_SEARCH,
      meta: {
        searchName,
        searchDescriptor,
      },
    });

    state.getIn([searchName, 'mostRecentKey']).should.equal(key);
  });

  it('should not change state on SET_MOST_RECENT_SEARCH if the specified key does not exist', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {},
    });

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: 'this should not change',
        byKey: {},
      },
    });

    const state = reducer(initialState, {
      type: SET_MOST_RECENT_SEARCH,
      meta: {
        searchName,
        searchDescriptor,
      },
    });

    state.getIn([searchName, 'mostRecentKey']).should.equal('this should not change');
  });

  it('should handle SEARCH_FULFILLED', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {},
    });

    const key = searchKey(searchDescriptor);

    const data = {
      'ns2:abstract-common-list': {
        itemsInPage: 4,
        pageNum: 0,
        pageSize: 4,
        totalItems: 23,
        'list-item': [
          {
            csid: '1111',
          },
          {
            csid: '2222',
          },
          {
            csid: '3333',
          },
          {
            csid: '4444',
          },
        ],
      },
    };

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            descriptor: searchDescriptor,
            isPending: true,
            result: null,
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_FULFILLED,
      payload: {
        data,
      },
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.should.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            descriptor: searchDescriptor,
            isPending: false,
            result: data,
            indexesByCsid: {
              1111: 0,
              2222: 1,
              3333: 2,
              4444: 3,
            },
            listNodeName: listTypeConfig.listNodeName,
            itemNodeName: listTypeConfig.itemNodeName,
          },
        },
      },
    }));

    isPending(state, searchName, searchDescriptor).should.equal(false);
    getResult(state, searchName, searchDescriptor).should.equal(Immutable.fromJS(data));
    (typeof getError(state, searchName, searchDescriptor)).should.equal('undefined');

    getIndexesByCsid(state, searchName, searchDescriptor).should.equal(Immutable.fromJS({
      1111: 0,
      2222: 1,
      3333: 2,
      4444: 3,
    }));

    getState(state, searchName, searchDescriptor).should
      .equal(state.getIn([searchName, 'byKey', key]));
  });

  it('should handle SEARCH_FULFILLED when a single item is found', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {},
    });

    const key = searchKey(searchDescriptor);

    const data = {
      'ns2:abstract-common-list': {
        itemsInPage: 1,
        pageNum: 0,
        pageSize: 40,
        totalItems: 1,
        'list-item': {
          csid: '1111',
        },
      },
    };

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            descriptor: searchDescriptor,
            isPending: true,
            result: null,
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_FULFILLED,
      payload: {
        data,
      },
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.should.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            descriptor: searchDescriptor,
            isPending: false,
            result: data,
            indexesByCsid: {
              1111: 0,
            },
            listNodeName: listTypeConfig.listNodeName,
            itemNodeName: listTypeConfig.itemNodeName,
          },
        },
      },
    }));

    isPending(state, searchName, searchDescriptor).should.equal(false);
    getResult(state, searchName, searchDescriptor).should.equal(Immutable.fromJS(data));
    (typeof getError(state, searchName, searchDescriptor)).should.equal('undefined');

    getIndexesByCsid(state, searchName, searchDescriptor).should.equal(Immutable.fromJS({
      1111: 0,
    }));

    getState(state, searchName, searchDescriptor).should
      .equal(state.getIn([searchName, 'byKey', key]));
  });

  it('should not change state on SEARCH_FULFILLED for an unknown search descriptor', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {},
    });

    const key = searchKey(searchDescriptor);
    const data = {};

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {},
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_FULFILLED,
      payload: {
        data,
      },
      meta: {
        searchName,
        searchDescriptor,
      },
    });

    state.should.equal(initialState);
  });

  it('should handle SEARCH_REJECTED', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {},
    });

    const key = searchKey(searchDescriptor);

    const error = {
      code: 'ERROR_CODE',
    };

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            descriptor: searchDescriptor,
            isPending: true,
            result: null,
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_REJECTED,
      payload: error,
      meta: {
        searchName,
        searchDescriptor,
      },
    });

    state.should.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            error,
            descriptor: searchDescriptor,
            isPending: false,
          },
        },
      },
    }));

    isPending(state, searchName, searchDescriptor).should.equal(false);
    (typeof getResult(state, searchName, searchDescriptor)).should.equal('undefined');
    getError(state, searchName, searchDescriptor).should.equal(Immutable.fromJS(error));
  });

  it('should not change state on SEARCH_REJECTED for an unknown search descriptor', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {},
    });

    const key = searchKey(searchDescriptor);

    const error = {
      code: 'ERROR_CODE',
    };

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {},
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_REJECTED,
      payload: error,
      meta: {
        searchName,
        searchDescriptor,
      },
    });

    state.should.equal(initialState);
  });

  it('should handle CLEAR_SEARCH_RESULTS', function test() {
    const initialState = Immutable.fromJS({
      [searchName]: {},
    });

    const state = reducer(initialState, {
      type: CLEAR_SEARCH_RESULTS,
      meta: {
        searchName,
      },
    });

    state.should.deep.equal(Immutable.fromJS({}));
  });

  it('should handle CREATE_EMPTY_SEARCH_RESULT', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {
        p: 2,
        size: 12,
      },
    });

    const emptyResultData = {
      'ns2:abstract-common-list': {
        itemsInPage: '0',
        totalItems: '0',
        pageNum: '2',
        pageSize: '12',
      },
    };

    const key = searchKey(searchDescriptor);

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            descriptor: searchDescriptor,
            isPending: true,
            result: null,
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: CREATE_EMPTY_SEARCH_RESULT,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            descriptor: searchDescriptor,
            isPending: false,
            result: emptyResultData,
            indexesByCsid: undefined,
            listNodeName: listTypeConfig.listNodeName,
            itemNodeName: listTypeConfig.itemNodeName,
          },
        },
      },
    }));

    isPending(state, searchName, searchDescriptor).should.equal(false);

    getResult(state, searchName, searchDescriptor).should
      .equal(Immutable.fromJS(emptyResultData));

    (typeof getError(state, searchName, searchDescriptor)).should.equal('undefined');
  });

  it('should handle SET_RESULT_ITEM_SELECTED', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {},
    });

    const key = searchKey(searchDescriptor);

    const items = [
      {
        csid: '1111',
      },
      {
        csid: '2222',
      },
      {
        csid: '3333',
      },
    ];

    const result = {
      'ns2:abstract-common-list': {
        itemsInPage: '3',
        totalItems: '3',
        pageNum: '0',
        pageSize: '3',
        'list-item': items,
      },
    };

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            result,
            descriptor: searchDescriptor,
          },
        },
      },
    });

    const index = 1;

    let state;

    state = reducer(initialState, {
      type: SET_RESULT_ITEM_SELECTED,
      payload: true,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
        index,
      },
    });

    state.should.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            result,
            descriptor: searchDescriptor,
          },
        },
        selected: {
          2222: items[1],
        },
      },
    }));

    getSelectedItems(state, searchName).should.equal(Immutable.fromJS({
      2222: items[1],
    }));

    state = reducer(state, {
      type: SET_RESULT_ITEM_SELECTED,
      payload: false,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
        index,
      },
    });

    state.should.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            result,
            descriptor: searchDescriptor,
          },
        },
        selected: {},
      },
    }));

    getSelectedItems(state, searchName).should.equal(Immutable.fromJS({}));

    state = reducer(initialState, {
      type: SET_RESULT_ITEM_SELECTED,
      payload: true,
      meta: {
        listTypeConfig,
        searchDescriptor,
        index,
        searchName: 'non-existent search name',
      },
    });

    state.should.deep.equal(initialState);
  });

  it('should handle CLEAR_SELECTED', function test() {
    const initialState = Immutable.fromJS({
      [searchName]: {
        selected: {
          1111: {},
        },
      },
    });

    const state = reducer(initialState, {
      type: CLEAR_SELECTED,
      meta: {
        searchName,
      },
    });

    state.should.equal(Immutable.fromJS({
      [searchName]: {},
    }));

    expect(getSelectedItems(state, searchName)).to.equal(undefined);
  });

  it('should handle DESELECT_RESULT_ITEM', function test() {
    const initialState = Immutable.fromJS({
      [searchName]: {
        selected: {
          1111: {},
          2222: {},
          3333: {},
        },
      },
    });

    const state = reducer(initialState, {
      type: DESELECT_RESULT_ITEM,
      meta: {
        searchName,
        csid: '2222',
      },
    });

    state.should.equal(Immutable.fromJS({
      [searchName]: {
        selected: {
          1111: {},
          3333: {},
        },
      },
    }));

    expect(getSelectedItems(state, searchName)).to.equal(Immutable.fromJS({
      1111: {},
      3333: {},
    }));
  });

  it('should handle SET_ALL_RESULT_ITEMS_SELECTED', function test() {
    const searchDescriptor = Immutable.fromJS({
      recordType: 'collectionobject',
      searchQuery: {},
    });

    const key = searchKey(searchDescriptor);

    const items = [
      {
        csid: '1111',
      },
      {
        csid: '2222',
      },
      {
        csid: '3333',
      },
    ];

    const result = {
      'ns2:abstract-common-list': {
        itemsInPage: '3',
        totalItems: '3',
        pageNum: '0',
        pageSize: '3',
        'list-item': items,
      },
    };

    const initialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            result,
            descriptor: searchDescriptor,
          },
        },
      },
    });

    let state;

    state = reducer(initialState, {
      type: SET_ALL_RESULT_ITEMS_SELECTED,
      payload: true,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    // Select all results.

    state.should.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            result,
            descriptor: searchDescriptor,
          },
        },
        selected: {
          1111: items[0],
          2222: items[1],
          3333: items[2],
        },
      },
    }));

    // Deselect all results.

    state = state.setIn([searchName, 'selected', '4444'], Immutable.Map());

    state = reducer(state, {
      type: SET_ALL_RESULT_ITEMS_SELECTED,
      payload: false,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.should.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            result,
            descriptor: searchDescriptor,
          },
        },
        selected: {
          4444: {},
        },
      },
    }));

    // Select with filter.

    state = reducer(state, {
      type: SET_ALL_RESULT_ITEMS_SELECTED,
      payload: true,
      meta: {
        filter: item => item.get('csid') === '1111' || item.get('csid') === '3333',
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.should.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            result,
            descriptor: searchDescriptor,
          },
        },
        selected: {
          1111: items[0],
          3333: items[2],
          4444: {},
        },
      },
    }));

    // A single item (non-list) result set.

    const singleItemResult = {
      'ns2:abstract-common-list': {
        itemsInPage: '1',
        totalItems: '1',
        pageNum: '0',
        pageSize: '3',
        'list-item': {
          csid: '1111',
        },
      },
    };

    const singleItemInitialState = Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            result: singleItemResult,
            descriptor: searchDescriptor,
          },
        },
      },
    });

    state = reducer(singleItemInitialState, {
      type: SET_ALL_RESULT_ITEMS_SELECTED,
      payload: true,
      meta: {
        listTypeConfig,
        searchName,
        searchDescriptor,
      },
    });

    state.should.equal(Immutable.fromJS({
      [searchName]: {
        mostRecentKey: key,
        byKey: {
          [key]: {
            result: singleItemResult,
            descriptor: searchDescriptor,
          },
        },
        selected: {
          1111: items[0],
        },
      },
    }));

    // Non-existent search name.

    state = reducer(initialState, {
      type: SET_ALL_RESULT_ITEMS_SELECTED,
      payload: true,
      meta: {
        listTypeConfig,
        searchName: 'foo',
        searchDescriptor,
      },
    });

    state.should.equal(initialState);
  });
});
