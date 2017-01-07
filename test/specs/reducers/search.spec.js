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
  it('should have empty immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map({}));
  });

  it('should handle SEARCH_STARTED', function test() {
    const state = reducer(Immutable.Map(), {
      type: SEARCH_STARTED,
    });

    state.should.deep.equal(Immutable.fromJS({ isPending: true }));

    isPending(state).should.equal(true);
  });

  it('should handle SEARCH_FULFILLED', function test() {
    const data = {
      itemsInPage: 40,
      pageNum: 0,
      pageSize: 40,
      totalItems: 234,
    };

    const state = reducer(Immutable.Map(), {
      type: SEARCH_FULFILLED,
      payload: {
        data,
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      isPending: false,
      result: data,
    }));

    isPending(state).should.equal(false);
    getResult(state).should.deep.equal(Immutable.fromJS(data));
    (typeof getError(state)).should.equal('undefined');
  });

  it('should handle SEARCH_REJECTED', function test() {
    const error = 'Error';

    const state = reducer(Immutable.Map(), {
      type: SEARCH_REJECTED,
      payload: error,
    });

    state.should.deep.equal(Immutable.fromJS({
      error,
      isPending: false,
    }));

    isPending(state).should.equal(false);
    (typeof getResult(state)).should.equal('undefined');
    getError(state).should.equal(error);
  });
});
