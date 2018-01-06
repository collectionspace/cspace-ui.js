/* global window */

import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import chaiAsPromised from 'chai-as-promised';
import thunk from 'redux-thunk';
import LoginModal from '../../../src/components/login/LoginModal';

import getSession, {
  CSPACE_CONFIGURED,
  configureCSpace,
  createSession,
  setSession,
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

    it('should dispatch CSPACE_CONFIGURED followed by PREFS_LOADED', function test() {
      const store = mockStore({
        user: Immutable.Map(),
      });

      const cspaceConfig = {
        foo: 'bar',
        serverUrl: 'http://something.org',
      };

      store.dispatch(configureCSpace(cspaceConfig));

      return new Promise((resolve) => {
        window.setTimeout(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should
            .include({ type: CSPACE_CONFIGURED })
            .and.have.property('payload')
              .that.has.property('url', 'http://something.org');

          actions[1].should
            .include({ type: PREFS_LOADED });

          resolve();
        }, 0);
      });
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
});
