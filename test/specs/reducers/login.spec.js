import chai from 'chai';

import {
  RESET_LOGIN,
  LOGIN_REDIRECTED,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
} from '../../../src/actions';

import reducer, {
  getContinuation,
  getError,
  getResponse,
  getUsername,
  isPending,
} from '../../../src/reducers/login';

chai.should();

describe('login reducer', function suite() {
  it('should have an empty initial state', function test() {
    reducer(undefined, {}).should.deep.equal({});
  });

  it('should handle RESET_LOGIN', function test() {
    const state = reducer({}, {
      type: RESET_LOGIN,
    });

    state.should.deep.equal({
      isPending: false,
      username: undefined,
      response: undefined,
      error: undefined,
    });

    isPending(state).should.equal(false);
  });

  it('should handle LOGIN_REDIRECTED', function test() {
    const state = reducer({}, {
      type: LOGIN_REDIRECTED,
      meta: {
        attemptedUrl: '/some/path',
      },
    });

    state.should.deep.equal({
      continuation: '/some/path',
    });

    getContinuation(state).should.equal('/some/path');
  });

  it('should handle LOGIN_STARTED', function test() {
    const loginUsername = 'user@collectionspace.org';

    const state = reducer({}, {
      type: LOGIN_STARTED,
      meta: {
        username: loginUsername,
      },
    });

    state.should.deep.equal({
      isPending: true,
      username: loginUsername,
      response: undefined,
      error: undefined,
    });

    getUsername(state).should.equal(loginUsername);
    isPending(state).should.equal(true);
  });

  it('should handle LOGIN_FULFILLED', function test() {
    const loginUsername = 'user@collectionspace.org';

    const loginResponse = {
      status: 200,
      headers: {
        foo: 'bar',
      },
    };

    const state = reducer({}, {
      type: LOGIN_FULFILLED,
      payload: loginResponse,
      meta: {
        username: loginUsername,
      },
    });

    state.should.deep.equal({
      isPending: false,
      username: loginUsername,
      response: loginResponse,
      error: undefined,
    });

    getResponse(state).should.equal(loginResponse);
    getUsername(state).should.equal(loginUsername);
    isPending(state).should.equal(false);
  });

  it('should handle LOGIN_REJECTED', function test() {
    const loginUsername = 'user@collectionspace.org';
    const loginError = new Error();

    const state = reducer({}, {
      type: LOGIN_REJECTED,
      payload: loginError,
      meta: {
        username: loginUsername,
      },
    });

    state.should.deep.equal({
      isPending: false,
      username: loginUsername,
      response: undefined,
      error: loginError,
    });

    getError(state).should.equal(loginError);
    getUsername(state).should.equal(loginUsername);
    isPending(state).should.equal(false);
  });
});
