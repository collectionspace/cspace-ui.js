/* global localStorage */

import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import getSession from '../../../src/helpers/session';

import {
  CSPACE_CONFIGURED,
  PREFS_LOADED,
  AUTH_RENEW_FULFILLED,
  AUTH_RENEW_REJECTED,
  RESET_LOGIN,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  ACCOUNT_PERMS_READ_FULFILLED,
  ACCOUNT_PERMS_READ_REJECTED,
  ACCOUNT_ROLES_READ_FULFILLED,
} from '../../../src/constants/actionCodes';

import {
  ERR_INVALID_CREDENTIALS,
  ERR_NETWORK,
  ERR_WRONG_TENANT,
} from '../../../src/constants/errorCodes';

import {
  readAccountPerms,
} from '../../../src/actions/account';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  resetLogin,
  login,
} from '../../../src/actions/login';

chai.should();

describe('login action creator', () => {
  describe('resetLogin', () => {
    const username = 'user@collectionspace.org';

    it('should create a RESET_LOGIN action', () => {
      resetLogin(username).should.deep.equal({
        type: RESET_LOGIN,
        meta: {
          username,
        },
      });
    });
  });

  describe('login', () => {
    const mockStore = configureMockStore([thunk]);
    const accountId = '1234';
    const tokenUrl = '/cspace-services/oauth/token';
    const accountPermsUrl = '/cspace-services/accounts/0/accountperms';
    const accountRolesUrl = `/cspace-services/accounts/${accountId}/accountroles`;
    const config = {};
    const prevUsername = 'prevuser@collectionspace.org';
    const username = 'user@collectionspace.org';
    const password = 'pw';

    const store = mockStore({
      notification: Immutable.Map(),
      user: Immutable.fromJS({
        username: prevUsername,
        account: {
          accountId,
        },
      }),
    });

    const tokenGrantPayload = {
      access_token: 'abcd',
      token_type: 'bearer',
      refresh_token: 'efgh',
      scope: 'full',
      jti: '1234',
    };

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      store.clearActions();
      moxios.uninstall();

      // Delete stored username/token from the test.
      localStorage.removeItem('cspace-client');
    });

    it('should update the active session', () => {
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
          getSession().should.be.an('object');
          getSession().config().should.have.property('username', username);
        });
    });

    it('should dispatch LOGIN_FULFILLED on success', () => {
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
          const actions = store.getActions();

          actions.should.have.lengthOf(6);

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
              data: {},
            },
            meta: {
              config,
              username,
            },
          });

          actions[3].should.deep.equal({
            type: ACCOUNT_ROLES_READ_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
          });

          actions[4].should.have.property('type', PREFS_LOADED);

          actions[5].should.deep.equal({
            type: LOGIN_FULFILLED,
            meta: {
              prevUsername,
              username,
            },
          });
        });
    });

    it('should dispatch LOGIN_REJECTED on error', () => {
      moxios.stubRequest(tokenUrl, {
        status: 400,
      });

      return store.dispatch(login(config, username, password))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: LOGIN_STARTED,
            meta: {
              username,
            },
          });

          actions[1].should.have.property('type', AUTH_RENEW_REJECTED);

          actions[2].should.have.property('type', LOGIN_REJECTED);
          actions[2].should.have.deep.property('meta.username', username);
        });
    });

    it('should dispatch AUTH_RENEW_REJECTED with error code ERR_INVALID_CREDENTIALS when an invalid credentials error response is received', () => {
      moxios.stubRequest(tokenUrl, {
        status: 400,
        response: {
          error_description: 'Bad credentials',
        },
      });

      return store.dispatch(login(config, username, password))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: LOGIN_STARTED,
            meta: {
              username,
            },
          });

          actions[1].should.have.property('type', AUTH_RENEW_REJECTED);
          actions[1].should.have.deep.property('payload.code', ERR_INVALID_CREDENTIALS);

          actions[2].should.have.property('type', LOGIN_REJECTED);
          actions[2].should.have.deep.property('meta.username', username);
        });
    });

    it('should dispatch AUTH_RENEW_REJECTED with error code ERR_NETWORK when a network error occurs', () => {
      moxios.stubRequest(tokenUrl, {
        status: 400,
        response: {
          error_description: 'Network Error',
        },
      });

      return store.dispatch(login(config, username, password))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: LOGIN_STARTED,
            meta: {
              username,
            },
          });

          actions[1].should.have.property('type', AUTH_RENEW_REJECTED);
          actions[1].should.have.deep.property('payload.code', ERR_NETWORK);

          actions[2].should.have.property('type', LOGIN_REJECTED);
          actions[2].should.have.deep.property('meta.username', username);
        });
    });

    it('should dispatch AUTH_RENEW_REJECTED with error code ERR_WRONG_TENANT when the account tenant id is not the tenant id configured for the ui', () => {
      moxios.stubRequest(tokenUrl, {
        status: 200,
        response: tokenGrantPayload,
      });

      moxios.stubRequest(accountPermsUrl, {
        status: 200,
        response: {
          'ns2:account_permission': {
            account: {
              tenantId: '5000',
            },
          },
        },
      });

      return store.dispatch(login(config, username, password))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(3);

          actions[0].should.deep.equal({
            type: LOGIN_STARTED,
            meta: {
              username,
            },
          });

          actions[1].should.have.property('type', AUTH_RENEW_REJECTED);
          actions[1].should.have.deep.property('payload.code', ERR_WRONG_TENANT);

          actions[2].should.have.property('type', LOGIN_REJECTED);
          actions[2].should.have.deep.property('meta.username', username);
        });
    });
  });

  describe('readAccountPerms', () => {
    const mockStore = configureMockStore([thunk]);
    const accountPermsUrl = '/cspace-services/accounts/0/accountperms';
    const username = 'admin@core.collectionspace.org';
    const config = {};

    const store = mockStore();

    const accountPermsPayload = {
      'ns2:account_permission': {
        account: {},
      },
    };

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      store.clearActions();
      moxios.uninstall();
    });

    it('should dispatch ACCOUNT_PERMS_READ_FULFILLED on success', () => {
      moxios.stubRequest(accountPermsUrl, {
        status: 200,
        response: accountPermsPayload,
      });

      return store.dispatch(readAccountPerms(config, username))
        .then(() => {
          const actions = store.getActions();

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

    it('should dispatch ACCOUNT_PERMS_READ_REJECTED on error', () => {
      moxios.stubRequest(accountPermsUrl, {
        status: 400,
        response: {},
      });

      return store.dispatch(readAccountPerms(config, username))
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.have.property('type', ACCOUNT_PERMS_READ_REJECTED);
        });
    });
  });
});
