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

const { expect } = chai;

chai.use(chaiImmutable);
chai.should();

describe('login reducer', () => {
  it('should have an empty immutable initial state', () => {
    reducer(undefined, {}).should.deep.equal(Immutable.Map({}));
  });

  it('should handle RESET_LOGIN', () => {
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

  it('should handle LOGIN_STARTED', () => {
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

  it('should handle LOGIN_FULFILLED', () => {
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

  it('should handle LOGIN_REJECTED', () => {
    const loginUsername = 'user@collectionspace.org';
    const errorCode = 'CODE';
    const innerError = new Error();
    const loginError = new Error();

    loginError.code = errorCode;
    loginError.error = innerError;

    const state = reducer(undefined, {
      type: LOGIN_REJECTED,
      payload: loginError,
      meta: {
        username: loginUsername,
      },
    });

    state.should.deep.equal(Immutable.Map({
      username: loginUsername,
      error: Immutable.Map({
        code: errorCode,
        error: innerError,
      }),
    }));

    getError(state).should.equal(Immutable.Map({
      code: errorCode,
      error: innerError,
    }));

    getUsername(state).should.equal(loginUsername);
    expect(isPending(state)).to.equal(undefined);
  });
});
