/* global localStorage */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Immutable from 'immutable';

import {
  PREFS_LOADED,
  LOGOUT_STARTED,
  LOGOUT_FULFILLED,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  login,
} from '../../../src/actions/login';

import {
  logout,
} from '../../../src/actions/logout';

chai.should();

describe('logout action creator', function suite() {
  describe('logout', function actionSuite() {
    const mockStore = configureMockStore([thunk]);
    const tokenUrl = '/cspace-services/oauth/token';
    const accountPermsUrl = '/cspace-services/accounts/0/accountperms';
    const accountRolesUrl = '/cspace-services/accounts/0/accountroles';
    const config = {};
    const username = 'user@collectionspace.org';
    const password = 'pw';

    const store = mockStore({
      user: Immutable.Map(),
    });

    const tokenGrantPayload = {
      access_token: 'abcd',
      token_type: 'bearer',
      refresh_token: 'efgh',
      scope: 'full',
      jti: '1234',
    };

    before(() =>
      store.dispatch(configureCSpace())
        .then(() => store.clearActions())
    );

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      store.clearActions();
      moxios.uninstall();

      // Delete stored username/token from the test.
      localStorage.removeItem('cspace-client');
    });

    it('should dispatch LOGOUT_FULFILLED on success', function test() {
      moxios.stubRequest(tokenUrl, {
        status: 200,
        response: tokenGrantPayload,
      });

      moxios.stubRequest(accountPermsUrl, {
        status: 200,
        response: {},
      });

      moxios.stubRequest(accountRolesUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(login(config, username, password))
        .then(() => {
          store.clearActions();

          return store.dispatch(logout());
        })
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: LOGOUT_STARTED,
          });

          actions[1].should.deep.equal({
            type: LOGOUT_FULFILLED,
            payload: {},
          });

          actions[2].should.deep.equal({
            type: PREFS_LOADED,
            payload: null,
          });
        });
    });
  });
});
