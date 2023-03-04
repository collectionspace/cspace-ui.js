/* global btoa */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import { setupWorker, rest } from 'msw';

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

describe('account action creator', () => {
  const mockStore = configureMockStore([thunk]);
  const worker = setupWorker();

  before(() => {
    worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('checkForRoleUses', () => {
    const csid = '1234';
    const checkUrl = `/cspace-services/authorization/roles/${csid}/accountroles`;

    before(() => {
      const store = mockStore();

      return store.dispatch(configureCSpace());
    });

    afterEach(() => {
      worker.resetHandlers();
    });

    it('should resolve to true if uses are found for the given role', () => {
      const store = mockStore();

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => res(ctx.json({
          'ns2:account_role': {
            account: [],
          },
        }))),
      );

      return store.dispatch(checkForRoleUses(csid)).then((result) => {
        result.should.equal(true);
      });
    });

    it('should resolve to false if no uses are found for the given role', () => {
      const store = mockStore();

      worker.use(
        rest.get(checkUrl, (req, res, ctx) => res(ctx.json({
          'ns2:account_role': {},
        }))),
      );

      return store.dispatch(checkForRoleUses(csid)).then((result) => {
        result.should.equal(false);
      });
    });
  });

  describe('requestPasswordReset', () => {
    const store = mockStore();
    const requestPasswordResetUrl = /\/cspace-services\/accounts\/requestpasswordreset.*/;

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should request a password reset', () => {
      const email = 'user@collectionspace.org';
      const tenantId = '2';

      worker.use(
        rest.post(requestPasswordResetUrl, (req, res, ctx) => {
          const {
            searchParams,
          } = req.url;

          if (
            searchParams.get('email') === email
            && searchParams.get('tid') === tenantId
          ) {
            return res(ctx.status(200));
          }

          return res(ctx.status(400));
        }),
      );

      return store.dispatch(requestPasswordReset(email, tenantId))
        .then((result) => {
          result.status.should.equal(200);
        });
    });
  });

  describe('resetPassword', () => {
    const store = mockStore();
    const requestPasswordResetUrl = /\/cspace-services\/accounts\/processpasswordreset.*/;

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should reset the password', () => {
      const password = 'topsecret';
      const token = '1234';

      let requestPayload = null;

      worker.use(
        rest.post(requestPasswordResetUrl, async (req, res, ctx) => {
          requestPayload = await req.json();

          return(res(ctx.status(200)));
        }),
      );

      return store.dispatch(resetPassword(password, token))
        .then((result) => {
          result.status.should.equal(200);

          const passwordReset = requestPayload['ns2:passwordreset'];

          passwordReset.token.should.equal(token);
          passwordReset.password.should.equal(btoa(password));
        });
    });
  });

  describe('readAccountPerms', () => {
    const store = mockStore();
    const config = {};

    const accountPermsUrl = '/cspace-services/accounts/0/accountperms';

    const accountPermsPayload = {
      'ns2:account_permission': {
        account: {},
      },
    };

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should dispatch ACCOUNT_PERMS_READ_FULFILLED on success', () => {
      worker.use(
        rest.get(accountPermsUrl, (req, res, ctx) => res(ctx.json(accountPermsPayload))),
      );

      return store.dispatch(readAccountPerms(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].type.should.equal(ACCOUNT_PERMS_READ_FULFILLED);
          actions[0].payload.status.should.equal(200);
          actions[0].payload.data.should.deep.equal(accountPermsPayload);
          actions[0].meta.config.should.deep.equal(config);
        });
    });

    it('should dispatch ACCOUNT_PERMS_READ_REJECTED on error', () => {
      worker.use(
        rest.get(accountPermsUrl, (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );

      return store.dispatch(readAccountPerms())
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.have.property('type', ACCOUNT_PERMS_READ_REJECTED);
        });
    });
  });

  describe('readAccountRoles', () => {
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

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should dispatch ACCOUNT_ROLES_READ_FULFILLED on success', () => {
      worker.use(
        rest.get(accountRolesUrl, (req, res, ctx) => res(ctx.json(accountRolesPayload))),
      );

      return store.dispatch(readAccountRoles())
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].type.should.equal(ACCOUNT_ROLES_READ_FULFILLED);
          actions[0].payload.status.should.equal(200);
          actions[0].payload.data.should.deep.equal(accountRolesPayload);
        });
    });

    it('should dispatch ACCOUNT_ROLES_READ_REJECTED on error', () => {
      worker.use(
        rest.get(accountRolesUrl, (req, res, ctx) => {
          return res(ctx.status(400));
        }),
      );

      return store.dispatch(readAccountRoles())
        .catch(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(1);

          actions[0].should.have.property('type', ACCOUNT_ROLES_READ_REJECTED);
        });
    });
  });
});
