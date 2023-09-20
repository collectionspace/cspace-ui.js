import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
} from '../../../src/constants/actionCodes';

import reducer, {
  getError,
  getLandingPath,
  getUsername,
  isPending,
  isSuccess,
} from '../../../src/reducers/login';

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

describe('login reducer', () => {
  it('should have an empty immutable initial state', () => {
    reducer(undefined, {}).should.deep.equal(Immutable.Map({}));
  });

  it('should handle LOGIN_STARTED', () => {
    const state = reducer(undefined, {
      type: LOGIN_STARTED,
    });

    state.should.deep.equal(Immutable.Map({
      isPending: true,
    }));

    isPending(state).should.equal(true);
    expect(getUsername(state)).to.equal(undefined);
  });

  it('should handle LOGIN_FULFILLED', () => {
    const landingPath = '/dashboard';
    const loginUsername = 'user@collectionspace.org';

    const state = reducer(undefined, {
      type: LOGIN_FULFILLED,
      meta: {
        landingPath,
        username: loginUsername,
      },
    });

    state.should.deep.equal(Immutable.fromJS({
      isSuccess: true,
      landingPath,
      username: loginUsername,
    }));

    getUsername(state).should.equal(loginUsername);
    getLandingPath(state).should.equal(landingPath);
    isSuccess(state).should.equal(true);
    expect(isPending(state)).to.equal(undefined);
  });

  it('should handle LOGIN_REJECTED', () => {
    const errorCode = 'CODE';
    const innerError = new Error();
    const loginError = new Error();

    loginError.code = errorCode;
    loginError.error = innerError;

    const state = reducer(undefined, {
      type: LOGIN_REJECTED,
      payload: loginError,
    });

    state.should.deep.equal(Immutable.Map({
      error: Immutable.Map({
        code: errorCode,
        error: innerError,
      }),
    }));

    getError(state).should.equal(Immutable.Map({
      code: errorCode,
      error: innerError,
    }));

    expect(getUsername(state)).to.equal(undefined);
    expect(isPending(state)).to.equal(undefined);
  });
});
