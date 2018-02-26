/* global btoa */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  checkForRoleUses,
  requestPasswordReset,
  resetPassword,
} from '../../../src/actions/account';

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
});
