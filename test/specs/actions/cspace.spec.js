/* global window */

import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import getSession, {
  CSPACE_CONFIGURED,
  configureCSpace,
  createSession,
  setSession,
} from '../../../src/actions/cspace';

import {
  PREFS_LOADED,
} from '../../../src/actions/prefs';

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
