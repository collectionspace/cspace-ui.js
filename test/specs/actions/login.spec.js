import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Immutable from 'immutable';

import getSession, {
  configureCSpace,
  CSPACE_CONFIGURED,
} from '../../../src/actions/cspace';

import {
  ACCOUNT_PERMS_READ_FULFILLED,
  ACCOUNT_PERMS_READ_REJECTED,
  AUTH_RENEW_FULFILLED,
  AUTH_RENEW_REJECTED,
  RESET_LOGIN,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  readAccountPerms,
  resetLogin,
  login,
} from '../../../src/actions/login';

import {
  PREFS_LOADED,
} from '../../../src/actions/prefs';

chai.should();

describe('login action creator', function suite() {
  describe('resetLogin', function actionSuite() {
    it('should create a RESET_LOGIN action', function test() {
      resetLogin().should.deep.equal({
        type: RESET_LOGIN,
      });
    });
  });

  describe('login', function actionSuite() {
    const mockStore = configureMockStore([thunk]);
    const tokenUrl = '/cspace-services/oauth/token';
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
    });

    it('should create a session as a side effect', function test() {
      moxios.stubRequest(tokenUrl, {
        status: 200,
        response: tokenGrantPayload,
      });

      return store.dispatch(login(config, username, password))
        .then(() => {
          getSession().should.be.an('object');
          getSession().config().should.have.property('username', username);
        });
    });

    it('should dispatch LOGIN_FULFILLED on success', function test() {
      moxios.stubRequest(tokenUrl, {
        status: 200,
        response: tokenGrantPayload,
      });

      return store.dispatch(login(config, username, password))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(5);

          actions[0].should.deep.equal({
            type: LOGIN_STARTED,
            meta: {
              username,
            },
          });

          actions[1].should.have.property('type', CSPACE_CONFIGURED);

          actions[2].should.deep.equal({
            type: AUTH_RENEW_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: tokenGrantPayload,
            },
            meta: {
              username,
            },
          });

          actions[3].should.have.property('type', PREFS_LOADED);

          actions[4].should.deep.equal({
            type: LOGIN_FULFILLED,
            meta: {
              username,
            },
          });
        });
    });

    it('should dispatch LOGIN_REJECTED on error', function test() {
      moxios.stubRequest(tokenUrl, {
        status: 400,
      });

      return store.dispatch(login(config, username, password))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(4);

          actions[0].should.deep.equal({
            type: LOGIN_STARTED,
            meta: {
              username,
            },
          });

          actions[1].should.have.property('type', CSPACE_CONFIGURED);
          actions[2].should.have.property('type', AUTH_RENEW_REJECTED);

          actions[3].should.have.property('type', LOGIN_REJECTED);
          actions[3].should.have.deep.property('meta.username', username);
        });
    });
  });

  describe('readAccountPerms', function actionSuite() {
    const mockStore = configureMockStore([thunk]);
    const accountPermsUrl = '/cspace-services/accounts/0/accountperms';
    const username = 'admin@core.collectionspace.org';
    const config = {};

    const store = mockStore({
      user: Immutable.Map(),
    });

    const accountPermsPayload = {
      'ns2:account_permission': {
        account: {},
      },
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
    });

    it('should dispatch ACCOUNT_PERMS_READ_FULFILLED on success', function test() {
      moxios.stubRequest(accountPermsUrl, {
        status: 200,
        response: accountPermsPayload,
      });

      const usernameStore = mockStore({
        user: Immutable.Map({
          username,
        }),
      });

      return usernameStore.dispatch(readAccountPerms(config))
        .then(() => {
          const actions = usernameStore.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
            type: ACCOUNT_PERMS_READ_FULFILLED,
            payload: {
              data: accountPermsPayload,
              headers: undefined,
              status: 200,
              statusText: undefined,
            },
            meta: {
              config,
            },
          });
        });
    });

    it('should dispatch ACCOUNT_PERMS_READ_REJECTED on error', function test() {
      moxios.stubRequest(accountPermsUrl, {
        status: 400,
        response: {},
      });

      const usernameStore = mockStore({
        user: Immutable.Map({
          username,
        }),
      });

      return usernameStore.dispatch(readAccountPerms(config))
        .catch(() => {
          const actions = usernameStore.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.have.property('type', ACCOUNT_PERMS_READ_REJECTED);
        });
    });

    it('should dispatch nothing if there is no username in the store', function test() {
      moxios.stubRequest(accountPermsUrl, {
        status: 200,
        response: accountPermsPayload,
      });

      return store.dispatch(readAccountPerms(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(0);
        });
    });
  });
});
