import {
  LOGOUT_STARTED,
  LOGOUT_FULFILLED,
} from '../../../src/actions/logout';

import reducer, {
  getResponse,
  isPending,
} from '../../../src/reducers/logout';

chai.should();

describe('logout reducer', function suite() {
  it('should have an empty initial state', function test() {
    reducer(undefined, {}).should.deep.equal({});
  });

  it('should handle LOGOUT_STARTED', function test() {
    const state = reducer({}, {
      type: LOGOUT_STARTED,
    });

    state.should.deep.equal({
      isPending: true,
      response: null,
    });

    isPending(state).should.equal(true);
  });

  it('should handle LOGOUT_FULFILLED', function test() {
    const logoutResponse = {
      status: 200,
      headers: {
        foo: 'bar',
      },
    };

    const state = reducer({}, {
      type: LOGOUT_FULFILLED,
      payload: logoutResponse,
    });

    state.should.deep.equal({
      isPending: false,
      response: logoutResponse,
    });

    getResponse(state).should.equal(logoutResponse);
    isPending(state).should.equal(false);
  });
});
