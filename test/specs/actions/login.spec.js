import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import getSession, {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  LOGIN_REDIRECTED,
  RESET_LOGIN,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  redirectLogin,
  resetLogin,
  login,
} from '../../../src/actions/login';

chai.should();

describe('login action creator', function suite() {
  describe('redirectLogin', function actionSuite() {
    it('should call the replace function with the login page URL as a side effect', function test() {
      let replaceArg = null;

      const replace = (arg) => {
        replaceArg = arg;
      };

      const attemptedUrl = '/some/url';

      redirectLogin(replace, attemptedUrl);

      replaceArg.should.equal('/login');
    });

    it('should create a LOGIN_REDIRECTED action', function test() {
      const replace = () => null;
      const attemptedUrl = '/some/url';

      redirectLogin(replace, attemptedUrl).should.deep.equal({
        type: LOGIN_REDIRECTED,
        meta: {
          attemptedUrl,
        },
      });
    });
  });

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

    it('should create a session as a side effect', function test() {
      moxios.stubRequest(tokenUrl, {
        status: 200,
        response: tokenGrantPayload,
      });

      const store = mockStore({});

      return store.dispatch(login(username, password))
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

      const store = mockStore({});

      return store.dispatch(login(username, password))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: LOGIN_STARTED,
            meta: {
              username,
            },
          });

          actions[1].should.deep.equal({
            type: LOGIN_FULFILLED,
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
        });
    });

    it('should dispatch LOGIN_REJECTED on error', function test() {
      moxios.stubRequest(tokenUrl, {
        status: 400,
      });

      const store = mockStore({});

      return store.dispatch(login(username, password))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: LOGIN_STARTED,
            meta: {
              username,
            },
          });

          actions[1].should.have.property('type', LOGIN_REJECTED);
          actions[1].should.have.deep.property('meta.username', username);
        });
    });
  });
});
