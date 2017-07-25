import Immutable from 'immutable';
import chaiImmutable from 'chai-immutable';

import {
  CSPACE_CONFIGURED,
} from '../../../src/actions/cspace';

import {
  ACCOUNT_PERMS_READ_FULFILLED,
  LOGIN_FULFILLED,
} from '../../../src/actions/login';

import {
  LOGOUT_FULFILLED,
} from '../../../src/actions/logout';

import reducer, {
  getScreenName,
  getUsername,
} from '../../../src/reducers/user';

const expect = chai.expect;

chai.use(chaiImmutable);
chai.should();

describe('user reducer', function suite() {
  it('should have empty immutable initial state', function test() {
    reducer(undefined, {}).should.equal(Immutable.Map());
  });

  it('should handle CSPACE_CONFIGURED', function test() {
    const username = 'user@collectionspace.org';

    const state = reducer(undefined, {
      type: CSPACE_CONFIGURED,
      payload: {
        username,
      },
    });

    state.should.equal(Immutable.Map({
      username,
    }));

    getUsername(state).should.equal(username);
  });

  it('should handle ACCOUNT_PERMS_READ_FULFILLED', function test() {
    const screenName = 'Screen Name';

    const response = {
      data: {
        'ns2:account_permission': {
          account: {
            screenName,
          },
        },
      },
    };

    const state = reducer(undefined, {
      type: ACCOUNT_PERMS_READ_FULFILLED,
      payload: response,
    });

    state.should.equal(Immutable.Map({
      screenName,
    }));

    getScreenName(state).should.equal(screenName);
  });

  it('should handle LOGIN_FULFILLED', function test() {
    const username = 'user@collectionspace.org';

    const state = reducer(undefined, {
      type: LOGIN_FULFILLED,
      meta: {
        username,
      },
    });

    state.should.equal(Immutable.Map({
      username,
    }));

    getUsername(state).should.equal(username);
  });

  it('should handle LOGOUT_FULFILLED', function test() {
    const state = reducer(undefined, {
      type: LOGOUT_FULFILLED,
    });

    state.should.equal(Immutable.Map());

    expect(getUsername(state)).to.equal(undefined);
  });
});
