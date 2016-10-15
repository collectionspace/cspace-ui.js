import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  login,
} from '../../../src/actions/login';

import {
  LOGOUT_STARTED,
  LOGOUT_FULFILLED,
  logout,
} from '../../../src/actions/logout';

chai.should();

describe('logout action creator', function suite() {
  describe('logout', function actionSuite() {
    const mockStore = configureMockStore([thunk]);
    const tokenUrl = '/cspace-services/oauth/token';
    const username = 'user@collectionspace.org';
    const password = 'pw';

    const tokenGrantPayload = {
      access_token: 'abcd',
      token_type: 'bearer',
      refresh_token: 'efgh',
      scope: 'full',
      jti: '1234',
    };

    before(() => {
      configureCSpace({});
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should dispatch LOGOUT_FULFILLED on success', function test() {
      moxios.stubRequest(tokenUrl, {
        status: 200,
        response: tokenGrantPayload,
      });

      const store = mockStore({});

      return store.dispatch(login(username, password))
        .then(() => {
          store.clearActions();

          return store.dispatch(logout());
        })
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: LOGOUT_STARTED,
          });

          actions[1].should.deep.equal({
            type: LOGOUT_FULFILLED,
            payload: {},
          });
        });
    });
  });
});
