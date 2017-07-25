/* global window */

import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import getSession, {
  CSPACE_CONFIGURED,
  configureCSpace,
  createSession,
} from '../../../src/actions/cspace';

import {
  PREFS_LOADED,
} from '../../../src/actions/prefs';

chai.should();

const mockStore = configureMockStore([thunk]);

describe('cspace action creator', function suite() {
  describe('configureCSpace', function actionSuite() {
    it('should create a CSpace session as a side effect', function test() {
      const store = mockStore({
        user: Immutable.Map(),
      });

      const cspaceConfig = {
        foo: 'bar',
      };

      store.dispatch(configureCSpace(cspaceConfig));

      const session = getSession();

      session.should.be.an('object');
      session.config().should.have.property('foo', 'bar');
    });

    it('should dispatch CSPACE_CONFIGURED followed by PREFS_LOADED', function test() {
      const store = mockStore({
        user: Immutable.Map(),
      });

      const cspaceConfig = {
        foo: 'bar',
      };

      store.dispatch(configureCSpace(cspaceConfig));

      return new Promise((resolve) => {
        window.setTimeout(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should
            .include({ type: CSPACE_CONFIGURED })
            .and.have.property('payload')
              .that.has.property('foo', 'bar');

          actions[1].should
            .include({ type: PREFS_LOADED });

          resolve();
        }, 0);
      });
    });
  });

  describe('createSession', function actionSuite() {
    it('should create a CSpace session as a side effect', function test() {
      const username = 'user@collectionspace.org';
      const password = 'topsecret';

      createSession(username, password);

      const session = getSession();

      session.should.be.an('object');
      session.config().should.have.property('foo', 'bar');
      session.config().should.have.property('username', username);
    });

    it('should create a CSPACE_CONFIGURED action', function test() {
      const username = 'user@collectionspace.org';
      const password = 'topsecret';

      createSession(username, password).should
        .include({ type: CSPACE_CONFIGURED })
        .and.have.property('payload')
          .that.has.property('username', username);
    });
  });
});
