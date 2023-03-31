/* global localStorage */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setupWorker, rest } from 'msw';
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

describe('logout action creator', () => {
  const worker = setupWorker();

  before(async function setup() {
    this.timeout(3000);

    await worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('logout', () => {
    const mockStore = configureMockStore([thunk]);
    const accountId = '1234';
    const tokenUrl = '/cspace-services/oauth/token';
    const accountPermsUrl = '/cspace-services/accounts/0/accountperms';
    const accountRolesUrl = `/cspace-services/accounts/${accountId}/accountroles`;
    const config = {};
    const username = 'user@collectionspace.org';
    const password = 'pw';

    const store = mockStore({
      user: Immutable.fromJS({
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

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();

      // Delete stored username/token from the test.
      localStorage.removeItem('cspace-client');
    });

    it('should dispatch LOGOUT_FULFILLED on success', () => {
      worker.use(
        rest.post(tokenUrl, (req, res, ctx) => res(ctx.json(tokenGrantPayload))),
        rest.get(accountPermsUrl, (req, res, ctx) => res(ctx.json({}))),
        rest.get(accountRolesUrl, (req, res, ctx) => res(ctx.json({}))),
      );

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
