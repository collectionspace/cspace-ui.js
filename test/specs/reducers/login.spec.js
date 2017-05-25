import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  RESET_LOGIN,
  LOGIN_REDIRECTED,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
} from '../../../src/actions/login';

import reducer, {
  getContinuation,
  getError,
  getResponse,
  getUsername,
  isPending,
} from '../../../src/reducers/login';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

describe('login reducer', function suite() {
  it('should have an empty immutable initial state', function test() {
    reducer(undefined, {}).should.deep.equal(Immutable.Map({}));
  });

  it('should handle RESET_LOGIN', function test() {
    const state = reducer(undefined, {
      type: RESET_LOGIN,
    });

    state.should.deep.equal(Immutable.Map({}));

    expect(isPending(state)).to.equal(undefined);
  });

  it('should handle LOGIN_REDIRECTED', function test() {
    const state = reducer(undefined, {
      type: LOGIN_REDIRECTED,
      meta: {
        attemptedUrl: '/some/path',
      },
    });

    state.should.deep.equal(Immutable.Map({
      continuation: '/some/path',
    }));

    getContinuation(state).should.equal('/some/path');
  });

  it('should handle LOGIN_STARTED', function test() {
    const loginUsername = 'user@collectionspace.org';

    const state = reducer(undefined, {
      type: LOGIN_STARTED,
      meta: {
        username: loginUsername,
      },
    });

    state.should.deep.equal(Immutable.Map({
      isPending: true,
      username: loginUsername,
    }));

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

    const state = reducer(undefined, {
      type: LOGIN_FULFILLED,
      payload: loginResponse,
      meta: {
        username: loginUsername,
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      username: loginUsername,
      response: loginResponse,
    }));

    getResponse(state).should.equal(Immutable.fromJS(loginResponse));
    getUsername(state).should.equal(loginUsername);
    expect(isPending(state)).to.equal(undefined);
  });

  it('should handle LOGIN_REJECTED', function test() {
    const loginUsername = 'user@collectionspace.org';
    const loginError = new Error();

    const state = reducer(undefined, {
      type: LOGIN_REJECTED,
      payload: loginError,
      meta: {
        username: loginUsername,
      },
    });

    state.should.deep.equal(Immutable.Map({
      username: loginUsername,
      error: loginError,
    }));

    getError(state).should.equal(loginError);
    getUsername(state).should.equal(loginUsername);
    expect(isPending(state)).to.equal(undefined);
  });
});
