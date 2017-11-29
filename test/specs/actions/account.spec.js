import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  requestPasswordReset,
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
});
