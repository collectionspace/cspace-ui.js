import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  RESET_LOGIN,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
} from '../../../src/constants/actionCodes';

import reducer, {
  getError,
  getUsername,
  isPending,
  isSuccess,
} from '../../../src/reducers/login';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

describe('login reducer', function suite() {
  it('should have an empty immutable initial state', function test() {
    reducer(undefined, {}).should.deep.equal(Immutable.Map({}));
  });

  it('should handle RESET_LOGIN', function test() {
    const username = 'someone@collectionspace.org';

    const state = reducer(undefined, {
      type: RESET_LOGIN,
      meta: {
        username,
      },
    });

    state.should.deep.equal(Immutable.Map({
      username,
    }));

    expect(isPending(state)).to.equal(undefined);
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

    const state = reducer(undefined, {
      type: LOGIN_FULFILLED,
      meta: {
        username: loginUsername,
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      isSuccess: true,
    }));

    expect(getUsername(state)).to.equal(undefined);
    isSuccess(state).should.equal(true);
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
