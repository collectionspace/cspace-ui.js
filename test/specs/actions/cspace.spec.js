/* global window */

import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import chaiAsPromised from 'chai-as-promised';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import LoginModal from '../../../src/components/login/LoginModal';

import { ACCOUNT_PERMS_READ_FULFILLED } from '../../../src/actions/account';

import {
  AUTH_VOCABS_READ_STARTED,
  AUTH_VOCABS_READ_FULFILLED,
} from '../../../src/actions/authority';

import getSession, {
  CSPACE_CONFIGURED,
  READ_SYSTEM_INFO_FULFILLED,
  READ_SYSTEM_INFO_REJECTED,
  configureCSpace,
  createSession,
  setSession,
  readSystemInfo,
} from '../../../src/actions/cspace';

import {
  RESET_LOGIN,
} from '../../../src/actions/login';

import {
  OPEN_MODAL,
} from '../../../src/actions/notification';

import {
  PREFS_LOADED,
} from '../../../src/actions/prefs';

chai.use(chaiAsPromised);
chai.should();

const mockStore = configureMockStore([thunk]);

describe('cspace action creator', function suite() {
  describe('configureCSpace', function actionSuite() {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should create a CSpace session and make it the active session', function test() {
      const store = mockStore({
        user: Immutable.Map(),
      });

      const cspaceConfig = {
        foo: 'bar',
        serverUrl: 'http://something.org',
      };

      store.dispatch(configureCSpace(cspaceConfig));

      const session = getSession();

      session.should.be.an('object');
      session.config().should.have.property('url', 'http://something.org');
    });

    it('should dispatch CSPACE_CONFIGURED, ACCOUNT_PERMS_READ_FULFILLED, PREFS_LOADED, and AUTH_VOCABS_READ_FULFILLED', function test() {
      moxios.stubRequest(/.*/, {
        status: 200,
        response: {},
      });

      const store = mockStore({
        user: Immutable.Map(),
      });

      const cspaceConfig = {
        foo: 'bar',
        serverUrl: 'http://something.org',
        recordTypes: {
          person: {
            serviceConfig: {
              servicePath: 'personauthorities',
              serviceType: 'authority',
            },
          },
        },
      };

      // Set a stored cspace-client username.

      window.localStorage.setItem('cspace-client', JSON.stringify({
        'cspace-ui': {
          [cspaceConfig.serverUrl]: {
            username: 'user@collectionspace.org',
          },
        },
      }));

      store.dispatch(configureCSpace(cspaceConfig));

      return new Promise((resolve) => {
        window.setTimeout(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(5);

          actions[0].should
            .include({ type: CSPACE_CONFIGURED })
            .and.have.property('payload')
              .that.has.property('url', 'http://something.org');

          actions[1].should.include({ type: ACCOUNT_PERMS_READ_FULFILLED });
          actions[2].should.include({ type: PREFS_LOADED });
          actions[3].should.include({ type: AUTH_VOCABS_READ_STARTED });
          actions[4].should.include({ type: AUTH_VOCABS_READ_FULFILLED });

          window.localStorage.removeItem('cspace-client');

          resolve();
        }, 0);
      });
    });

    it('should resolve if the readAccountPerms query returns a 401 error', function test() {
      moxios.stubRequest(/\/accounts\/0\/accountperms/, {
        status: 401,
        response: {},
      });

      const store = mockStore({
        user: Immutable.Map(),
      });

      const cspaceConfig = {
        foo: 'bar',
        serverUrl: 'http://something.org',
        recordTypes: {
          person: {
            serviceConfig: {
              servicePath: 'personauthorities',
              serviceType: 'authority',
            },
          },
        },
      };

      // Set a stored cspace-client username.

      window.localStorage.setItem('cspace-client', JSON.stringify({
        'cspace-ui': {
          [cspaceConfig.serverUrl]: {
            username: 'user@collectionspace.org',
          },
        },
      }));

      return store.dispatch(configureCSpace(cspaceConfig))
        .then(() => Promise.resolve());
    });

    it('should reject if the readAccountPerms query returns an error other than 401', function test() {
      moxios.stubRequest(/\/accounts\/0\/accountperms/, {
        status: 500,
        response: {},
      });

      const store = mockStore({
        user: Immutable.Map(),
      });

      const cspaceConfig = {
        foo: 'bar',
        serverUrl: 'http://something.org',
        recordTypes: {
          person: {
            serviceConfig: {
              servicePath: 'personauthorities',
              serviceType: 'authority',
            },
          },
        },
      };

      // Set a stored cspace-client username.

      window.localStorage.setItem('cspace-client', JSON.stringify({
        'cspace-ui': {
          [cspaceConfig.serverUrl]: {
            username: 'user@collectionspace.org',
          },
        },
      }));

      return store.dispatch(configureCSpace(cspaceConfig))
        .catch(() => Promise.resolve());
    });

    it('should configure an onError callback that is a function', function test() {
      const store = mockStore({
        user: Immutable.Map(),
      });

      store.dispatch(configureCSpace());

      const session = getSession();
      const config = session.config();

      config.onError.should.be.a('function');
    });
  });

  describe('onError callback', function onErrorSuite() {
    const store = mockStore({
      notification: Immutable.Map(),
      user: Immutable.Map(),
    });

    store.dispatch(configureCSpace());

    const { onError } = getSession().config();

    afterEach(() => {
      store.clearActions();
    });

    it('should reject with the error', function test() {
      const error = new Error();

      onError(error).should.eventually.be.rejectedWith(error);
    });

    it('should dispatch RESET_LOGIN and OPEN_MODAL if the error is an invalid token 401 error', function test() {
      const error = {
        response: {
          status: 401,
          data: {
            error: 'invalid_token',
          },
        },
      };

      onError(error);

      const actions = store.getActions();

      actions.length.should.equal(2);

      actions[0].should.deep.equal({
        type: RESET_LOGIN,
        meta: {
          username: '',
        },
      });

      actions[1].should.deep.equal({
        type: OPEN_MODAL,
        meta: {
          name: LoginModal.modalName,
        },
      });
    });
  });

  describe('createSession', function actionSuite() {
    it('should return a cspace session', function test() {
      const username = 'user@collectionspace.org';
      const password = 'topsecret';

      const session = createSession(username, password);

      session.should.be.an('object');
      session.config().should.have.property('username', username);
    });
  });

  describe('setSession', function actionSuite() {
    it('should create a CSPACE_CONFIGURED action', function test() {
      const username = 'user@collectionspace.org';
      const password = 'topsecret';

      const session = createSession(username, password);

      setSession(session).should
        .include({ type: CSPACE_CONFIGURED })
        .and.have.property('payload')
          .that.has.property('username', username);
    });

    it('should update the active session', function test() {
      const username = 'user@collectionspace.org';
      const password = 'topsecret';

      const session = createSession(username, password);

      setSession(session);

      getSession().should.equal(session);
    });
  });

  describe('readSystemInfo', function actionSuite() {
    const store = mockStore({
      cspace: Immutable.Map(),
      // user: Immutable.Map(),
    });

    const systemInfoUrl = '/cspace-services/systeminfo';

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

    it('should dispatch READ_SYSTEM_INFO_FULFILLED on success', function test() {
      moxios.stubRequest(systemInfoUrl, {
        status: 200,
        response: {
          'ns2:system_info_common': {
            version: {
              major: '5',
              minor: '1',
            },
          },
        },
      });

      return store.dispatch(readSystemInfo())
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
            type: READ_SYSTEM_INFO_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {
                'ns2:system_info_common': {
                  version: {
                    major: '5',
                    minor: '1',
                  },
                },
              },
            },
          });
        });
    });

    it('should dispatch READ_SYSTEM_INFO_REJECTED on error', function test() {
      moxios.stubRequest(systemInfoUrl, {
        status: 404,
        response: {},
      });

      return store.dispatch(readSystemInfo())
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].type.should.equal(READ_SYSTEM_INFO_REJECTED);
        });
    });
  });
});
