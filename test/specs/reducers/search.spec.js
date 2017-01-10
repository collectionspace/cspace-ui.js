import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
} from '../../../src/actions/search';

import reducer, {
  getError,
  getResult,
  isPending,
} from '../../../src/reducers/search';

chai.use(chaiImmutable);
chai.should();

describe('search reducer', function suite() {
  it('should have immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.fromJS({
      mostRecentKey: null,
      byKey: {},
    }));
  });

  it('should handle SEARCH_STARTED', function test() {
    const searchDescriptor = {
      recordType: 'object',
      searchQuery: {},
    };

    const key = JSON.stringify(searchDescriptor);

    const state = reducer(undefined, {
      type: SEARCH_STARTED,
      meta: searchDescriptor,
    });

    state.should.deep.equal(Immutable.fromJS({
      mostRecentKey: key,
      byKey: {
        [key]: {
          descriptor: searchDescriptor,
          isPending: true,
          result: null,
        },
      },
    }));

    isPending(state, searchDescriptor).should.equal(true);
  });

  it('should clear all search states on SEARCH_STARTED when the new search is not only a page change', function test() {
    const searchDescriptor = {
      recordType: 'group',
      searchQuery: {},
    };

    const key = JSON.stringify(searchDescriptor);

    const initialState = Immutable.fromJS({
      mostRecentKey: 'somekey',
      byKey: {
        somekey: {
          descriptor: {
            recordType: 'object',
          },
        },
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_STARTED,
      meta: searchDescriptor,
    });

    state.get('mostRecentKey').should.equal(key);
    state.get('byKey').size.should.equal(1);
  });

  it('should seed search result on SEARCH_STARTED when the new search is only a page change', function test() {
    const searchDescriptor = {
      recordType: 'object',
      searchQuery: {
        p: '2',
        size: '10',
      },
    };

    const key = JSON.stringify(searchDescriptor);

    const initialState = Immutable.fromJS({
      mostRecentKey: 'somekey',
      byKey: {
        somekey: {
          descriptor: {
            recordType: 'object',
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
    });

    const state = reducer(initialState, {
      type: SEARCH_STARTED,
      meta: searchDescriptor,
    });

    state.get('mostRecentKey').should.equal(key);
    state.getIn(['byKey', key, 'result', 'ns2:abstract-common-list', 'totalItems']).should.equal('22');
  });

  it('should not change state on SEARCH_STARTED when a non-error state already exists for a search descriptor', function test() {
    const searchDescriptor = {
      recordType: 'object',
      searchQuery: {},
    };

    const key = JSON.stringify(searchDescriptor);

    const initialState = Immutable.fromJS({
      mostRecentKey: key,
      byKey: {
        [key]: {},
      },
    });

    const state = reducer(initialState, {
      type: SEARCH_STARTED,
      meta: searchDescriptor,
    });

    state.should.equal(initialState);
  });

  it('should handle SEARCH_FULFILLED', function test() {
    const searchDescriptor = {
      recordType: 'object',
      searchQuery: {},
    };

    const key = JSON.stringify(searchDescriptor);

    const data = {
      itemsInPage: 40,
      pageNum: 0,
      pageSize: 40,
      totalItems: 234,
    };

    const state = reducer(Immutable.fromJS({
      mostRecentKey: key,
      byKey: {
        [key]: {
          descriptor: searchDescriptor,
          isPending: true,
          result: null,
        },
      },
    }), {
      type: SEARCH_FULFILLED,
      payload: {
        data,
      },
      meta: searchDescriptor,
    });

    state.should.deep.equal(Immutable.fromJS({
      mostRecentKey: key,
      byKey: {
        [key]: {
          descriptor: searchDescriptor,
          isPending: false,
          result: data,
        },
      },
    }));

    isPending(state, searchDescriptor).should.equal(false);
    getResult(state, searchDescriptor).should.deep.equal(Immutable.fromJS(data));
    (typeof getError(state, searchDescriptor)).should.equal('undefined');
  });

  it('should not change state on SEARCH_FULFILLED for an unknown search descriptor', function test() {
    const searchDescriptor = {
      recordType: 'object',
      searchQuery: {},
    };

    const key = JSON.stringify(searchDescriptor);
    const data = {};

    const initialState = Immutable.fromJS({
      mostRecentKey: key,
      byKey: {},
    });

    const state = reducer(initialState, {
      type: SEARCH_FULFILLED,
      payload: {
        data,
      },
      meta: searchDescriptor,
    });

    state.should.equal(initialState);
  });

  it('should handle SEARCH_REJECTED', function test() {
    const searchDescriptor = {
      recordType: 'object',
      searchQuery: {},
    };

    const key = JSON.stringify(searchDescriptor);

    const error = {
      code: 'ERROR_CODE',
    };

    const state = reducer(Immutable.fromJS({
      mostRecentKey: key,
      byKey: {
        [key]: {
          descriptor: searchDescriptor,
          isPending: true,
          result: null,
        },
      },
    }), {
      type: SEARCH_REJECTED,
      payload: error,
      meta: searchDescriptor,
    });

    state.should.deep.equal(Immutable.fromJS({
      mostRecentKey: key,
      byKey: {
        [key]: {
          error,
          descriptor: searchDescriptor,
          isPending: false,
        },
      },
    }));

    isPending(state, searchDescriptor).should.equal(false);
    (typeof getResult(state, searchDescriptor)).should.equal('undefined');
    getError(state, searchDescriptor).should.equal(Immutable.fromJS(error));
  });

  it('should not change state on SEARCH_REJECTED for an unknown search descriptor', function test() {
    const searchDescriptor = {
      recordType: 'object',
      searchQuery: {},
    };

    const key = JSON.stringify(searchDescriptor);

    const error = {
      code: 'ERROR_CODE',
    };

    const initialState = Immutable.fromJS({
      mostRecentKey: key,
      byKey: {},
    });

    const state = reducer(initialState, {
      type: SEARCH_REJECTED,
      payload: error,
      meta: searchDescriptor,
    });

    state.should.equal(initialState);
  });
});
