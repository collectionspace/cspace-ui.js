import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  ADD_TERM_STARTED,
  ADD_TERM_FULFILLED,
  ADD_TERM_REJECTED,
  PARTIAL_TERM_SEARCH_STARTED,
  PARTIAL_TERM_SEARCH_FULFILLED,
  PARTIAL_TERM_SEARCH_REJECTED,
  CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
} from '../../../src/constants/actionCodes';

import reducer, {
  getMatches,
} from '../../../src/reducers/partialTermSearch';

chai.use(chaiImmutable);
chai.should();

describe('partialTermSearch reducer', () => {
  const recordType = 'person';
  const vocabulary = 'local';
  const displayName = 'abcd';
  const partialTerm = 'zyxw';

  it('should have an empty Immutable initial state', () => {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle ADD_TERM_STARTED', () => {
    reducer(Immutable.Map(), {
      type: ADD_TERM_STARTED,
      meta: {
        displayName,
        partialTerm,
        recordType,
        vocabulary,
      },
    }).should.equal(Immutable.fromJS({
      [partialTerm]: {
        [recordType]: {
          [vocabulary]: {
            isAddPending: true,
          },
        },
      },
    }));
  });

  it('should handle ADD_TERM_FULFILLED', () => {
    const newTermData = {};

    const addTermResponse = {
      data: newTermData,
    };

    reducer(Immutable.Map(), {
      type: ADD_TERM_FULFILLED,
      payload: addTermResponse,
      meta: {
        displayName,
        partialTerm,
        recordType,
        vocabulary,
      },
    }).should.equal(Immutable.fromJS({
      [partialTerm]: {
        [recordType]: {
          [vocabulary]: {
            newTerm: newTermData,
          },
        },
      },
    }));
  });

  it('should handle ADD_TERM_REJECTED', () => {
    const error = new Error();

    reducer(Immutable.Map(), {
      type: ADD_TERM_REJECTED,
      payload: error,
      meta: {
        displayName,
        partialTerm,
        recordType,
        vocabulary,
      },
    }).should.equal(Immutable.fromJS({
      [partialTerm]: {
        [recordType]: {
          [vocabulary]: {
            error,
          },
        },
      },
    }));
  });

  it('should handle PARTIAL_TERM_SEARCH_STARTED', () => {
    reducer(Immutable.Map(), {
      type: PARTIAL_TERM_SEARCH_STARTED,
      meta: {
        partialTerm,
        recordType,
        vocabulary,
      },
    }).should.equal(Immutable.fromJS({
      [partialTerm]: {
        [recordType]: {
          [vocabulary]: {
            isSearchPending: true,
          },
        },
      },
    }));
  });

  it('should handle PARTIAL_TERM_SEARCH_FULFILLED', () => {
    const items = [
      { refName: 'a' },
      { refName: 'b' },
    ];

    const searchData = {
      'ns2:abstract-common-list': {
        itemsInPage: '2',
        'list-item': items,
      },
    };

    const searchResponse = {
      data: searchData,
    };

    const newState = reducer(Immutable.Map(), {
      type: PARTIAL_TERM_SEARCH_FULFILLED,
      payload: searchResponse,
      meta: {
        partialTerm,
        recordType,
        vocabulary,
      },
    });

    newState.getIn([partialTerm, recordType, vocabulary, 'items']).should.deep.equal(items);

    getMatches(newState).should.equal(newState);
  });

  it('should set items to empty array if search result count is zero', () => {
    const searchData = {
      'ns2:abstract-common-list': {
        itemsInPage: '0',
      },
    };

    const searchResponse = {
      data: searchData,
    };

    const newState = reducer(Immutable.Map(), {
      type: PARTIAL_TERM_SEARCH_FULFILLED,
      payload: searchResponse,
      meta: {
        partialTerm,
        recordType,
        vocabulary,
      },
    });

    newState.getIn([partialTerm, recordType, vocabulary, 'items']).should
      .deep.equal([]);

    getMatches(newState).should.equal(newState);
  });

  it('should set items to an array if one list item is returned', () => {
    const items = { refName: 'a' };

    const searchData = {
      'ns2:abstract-common-list': {
        itemsInPage: '1',
        'list-item': items,
      },
    };

    const searchResponse = {
      data: searchData,
    };

    const newState = reducer(Immutable.Map(), {
      type: PARTIAL_TERM_SEARCH_FULFILLED,
      payload: searchResponse,
      meta: {
        partialTerm,
        recordType,
        vocabulary,
      },
    });

    newState.getIn([partialTerm, recordType, vocabulary, 'items']).should
      .deep.equal([items]);

    getMatches(newState).should.equal(newState);
  });

  it('should handle PARTIAL_TERM_SEARCH_REJECTED', () => {
    const error = new Error();

    const newState = reducer(Immutable.Map(), {
      type: PARTIAL_TERM_SEARCH_REJECTED,
      payload: error,
      meta: {
        partialTerm,
        recordType,
        vocabulary,
      },
    });

    newState.getIn([partialTerm, recordType, vocabulary, 'error']).should.deep.equal(error);
  });

  it('should handle CLEAR_PARTIAL_TERM_SEARCH_RESULTS', () => {
    reducer(Immutable.fromJS({
      [partialTerm]: {
        [recordType]: {
          [vocabulary]: {
            isSearchPending: true,
          },
        },
      },
    }), {
      type: CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
    }).should.equal(Immutable.Map({}));
  });
});
