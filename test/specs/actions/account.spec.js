/* global btoa */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  requestPasswordReset,
  resetPassword,
} from '../../../src/actions/account';

describe('account action creator', function suite() {
  describe('requestPasswordReset', function actionSuite() {
    const mockStore = configureMockStore([thunk]);
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
    const mockStore = configureMockStore([thunk]);
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
