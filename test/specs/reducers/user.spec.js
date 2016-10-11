import chai from 'chai';

import {
  CSPACE_CONFIGURED,
  LOGIN_FULFILLED,
  LOGOUT_FULFILLED,
} from '../../../src/actions';

import reducer, {
  getUsername,
} from '../../../src/reducers/user';

const expect = chai.expect;

chai.should();

describe('user reducer', function suite() {
  it('should have empty initial state', function test() {
    reducer(undefined, {}).should.deep.equal({});
  });

  it('should handle CSPACE_CONFIGURED', function test() {
    const username = 'user@collectionspace.org';

    const state = reducer({}, {
      type: CSPACE_CONFIGURED,
      payload: {
        username,
      },
    });

    state.should.deep.equal({
      username,
    });

    getUsername(state).should.equal(username);
  });

  it('should handle LOGIN_FULFILLED', function test() {
    const username = 'user@collectionspace.org';

    const state = reducer({}, {
      type: LOGIN_FULFILLED,
      meta: {
        username,
      },
    });

    state.should.deep.equal({
      username,
    });

    getUsername(state).should.equal(username);
  });

  it('should handle LOGOUT_FULFILLED', function test() {
    const state = reducer({}, {
      type: LOGOUT_FULFILLED,
    });

    state.should.deep.equal({
      username: null,
    });

    expect(getUsername(state)).to.equal(null);
  });
});
