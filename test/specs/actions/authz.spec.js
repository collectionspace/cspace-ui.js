import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setupWorker, rest } from 'msw';

import {
  PERMS_READ_STARTED,
  PERMS_READ_FULFILLED,
  PERMS_READ_REJECTED,
  ROLES_READ_STARTED,
  ROLES_READ_FULFILLED,
  ROLES_READ_REJECTED,
} from '../../../src/constants/actionCodes';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  readPerms,
  readRoles,
} from '../../../src/actions/authz';

describe('authz action creator', () => {
  const worker = setupWorker();

  before(async function setup() {
    await worker.start({ quiet: true });
  });

  after(() => {
    worker.stop();
  });

  describe('readPerms', () => {
    const mockStore = configureMockStore([thunk]);

    const store = mockStore({
      authz: Immutable.Map(),
      user: Immutable.Map(),
    });

    const config = {};
    const readPermsUrl = '/cspace-services/authorization/permissions';

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should dispatch PERMS_READ_FULFILLED on success', () => {
      worker.use(
        rest.get(readPermsUrl, (req, res, ctx) => {
          const {
            searchParams,
          } = req.url;

          if (
            searchParams.get('pgSz') === '0'
            && searchParams.get('actGrp') === 'CRUDL'
          ) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      return store.dispatch(readPerms(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: PERMS_READ_STARTED,
          });

          actions[1].type.should.equal(PERMS_READ_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});
          actions[1].meta.config.should.deep.equal(config);
        });
    });

    it('should dispatch PERMS_READ_REJECTED on error', () => {
      worker.use(
        rest.get(readPermsUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      return store.dispatch(readPerms(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: PERMS_READ_STARTED,
          });

          actions[1].should.have.property('type', PERMS_READ_REJECTED);
        });
    });

    it('should not dispatch any action if a read is already pending', () => {
      const inProgressStore = mockStore({
        authz: Immutable.Map({
          isPermsReadPending: true,
        }),
      });

      return inProgressStore.dispatch(readPerms(config))
        .then(() => {
          const actions = inProgressStore.getActions();

          actions.should.have.lengthOf(0);
        });
    });

    it('should not dispatch any action if permissions have already been retrieved', () => {
      const permsRetrievedStore = mockStore({
        authz: Immutable.Map({
          resourceNames: Immutable.List(),
        }),
      });

      return permsRetrievedStore.dispatch(readPerms(config))
        .then(() => {
          const actions = permsRetrievedStore.getActions();

          actions.should.have.lengthOf(0);
        });
    });
  });

  describe('readRoles', () => {
    const mockStore = configureMockStore([thunk]);

    const store = mockStore({
      authz: Immutable.Map(),
      user: Immutable.Map(),
    });

    const readRolesUrl = '/cspace-services/authorization/roles';

    before(() => store.dispatch(configureCSpace())
      .then(() => store.clearActions()));

    afterEach(() => {
      store.clearActions();
      worker.resetHandlers();
    });

    it('should dispatch ROLES_READ_FULFILLED on success', () => {
      worker.use(
        rest.get(readRolesUrl, (req, res, ctx) => {
          const {
            searchParams,
          } = req.url;

          if (
            searchParams.get('pgSz') === '0'
          ) {
            return res(ctx.json({}));
          }

          return res(ctx.status(400));
        }),
      );

      return store.dispatch(readRoles())
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: ROLES_READ_STARTED,
          });

          actions[1].type.should.equal(ROLES_READ_FULFILLED);
          actions[1].payload.status.should.equal(200);
          actions[1].payload.data.should.deep.equal({});
        });
    });

    it('should dispatch ROLES_READ_REJECTED on error', () => {
      worker.use(
        rest.get(readRolesUrl, (req, res, ctx) => res(ctx.status(400))),
      );

      return store.dispatch(readRoles())
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: ROLES_READ_STARTED,
          });

          actions[1].should.have.property('type', ROLES_READ_REJECTED);
        });
    });

    it('should not dispatch any action if a read is already pending', () => {
      const inProgressStore = mockStore({
        authz: Immutable.Map({
          isRolesReadPending: true,
        }),
      });

      return inProgressStore.dispatch(readRoles())
        .then(() => {
          const actions = inProgressStore.getActions();

          actions.should.have.lengthOf(0);
        });
    });

    it('should not dispatch any action if roles have already been retrieved', () => {
      const rolesRetrievedStore = mockStore({
        authz: Immutable.Map({
          roles: Immutable.List(),
        }),
      });

      return rolesRetrievedStore.dispatch(readRoles())
        .then(() => {
          const actions = rolesRetrievedStore.getActions();

          actions.should.have.lengthOf(0);
        });
    });
  });
});
