/* global btoa */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import Immutable from 'immutable';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  checkForRoleUses,
  requestPasswordReset,
  resetPassword,
  readAccountPerms,
  readAccountRoles,
} from '../../../src/actions/account';

import {
  ACCOUNT_PERMS_READ_FULFILLED,
  ACCOUNT_PERMS_READ_REJECTED,
  ACCOUNT_ROLES_READ_FULFILLED,
  ACCOUNT_ROLES_READ_REJECTED,
} from '../../../src/constants/actionCodes';

chai.should();

describe('account action creator', function suite() {
  const mockStore = configureMockStore([thunk]);

  describe('checkForRoleUses', function actionSuite() {
    const csid = '1234';
    const checkUrl = `/cspace-services/authorization/roles/${csid}/accountroles`;

    before(() => {
      const store = mockStore();

      return store.dispatch(configureCSpace());
    });

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('should resolve to true if uses are found for the given role', function test() {
      const store = mockStore();

      moxios.stubRequest(checkUrl, {
        status: 200,
        response: {
          'ns2:account_role': {
            account: [],
          },
        },
      });

      return store.dispatch(checkForRoleUses(csid)).then((result) => {
        result.should.equal(true);
      });
    });

    it('should resolve to false if no uses are found for the given role', function test() {
      const store = mockStore();

      moxios.stubRequest(checkUrl, {
        status: 200,
        response: {
          'ns2:account_role': {},
        },
      });

      return store.dispatch(checkForRoleUses(csid)).then((result) => {
        result.should.equal(false);
      });
    });
  });

  describe('requestPasswordReset', function actionSuite() {
    const store = mockStore();

    const requestPasswordResetUrl = /\/cspace-services\/accounts\/requestpasswordreset.*/;

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

    it('should request a password reset', function test() {
      const email = 'user@collectionspace.org';
      const tenantId = '2';

      moxios.stubRequest(requestPasswordResetUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(requestPasswordReset(email, tenantId))
        .then(() => {
          const request = moxios.requests.mostRecent();

          request.config.params.email.should.equal(email);
          request.config.params.tid.should.equal(tenantId);
        });
    });
  });

  describe('resetPassword', function actionSuite() {
    const store = mockStore();

    const requestPasswordResetUrl = /\/cspace-services\/accounts\/processpasswordreset.*/;

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

    it('should reset the password', function test() {
      const password = 'topsecret';
      const token = '1234';

      moxios.stubRequest(requestPasswordResetUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(resetPassword(password, token))
        .then(() => {
          const request = moxios.requests.mostRecent();

          request.config.data.should.contain(`"token":"${token}","password":"${btoa(password)}"`);
        });
    });
  });

  describe('readAccountPerms', function actionSuite() {
    const store = mockStore();
    const config = {};

    const accountPermsUrl = '/cspace-services/accounts/0/accountperms';

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

      return store.dispatch(readAccountPerms(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
            type: ACCOUNT_PERMS_READ_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: accountPermsPayload,
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

      return store.dispatch(readAccountPerms())
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.have.property('type', ACCOUNT_PERMS_READ_REJECTED);
        });
    });
  });

  describe('readAccountRoles', function actionSuite() {
    const accountId = '1234';
    const accountRolesUrl = `/cspace-services/accounts/${accountId}/accountroles`;

    const accountRolesPayload = {
      'ns2:account_role': {
        account: {},
        role: {},
      },
    };

    const store = mockStore({
      user: Immutable.fromJS({
        account: {
          accountId,
        },
      }),
    });

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

    it('should dispatch ACCOUNT_ROLES_READ_FULFILLED on success', function test() {
      moxios.stubRequest(accountRolesUrl, {
        status: 200,
        response: accountRolesPayload,
      });

      return store.dispatch(readAccountRoles())
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.deep.equal({
            type: ACCOUNT_ROLES_READ_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: accountRolesPayload,
            },
          });
        });
    });

    it('should dispatch ACCOUNT_ROLES_READ_REJECTED on error', function test() {
      moxios.stubRequest(accountRolesUrl, {
        status: 400,
        response: {},
      });

      return store.dispatch(readAccountRoles())
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.have.property('type', ACCOUNT_ROLES_READ_REJECTED);
        });
    });
  });
});
