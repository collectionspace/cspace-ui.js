import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import {
  configureCSpace,
} from '../../../src/actions/cspace';

import {
  PERMS_READ_STARTED,
  PERMS_READ_FULFILLED,
  PERMS_READ_REJECTED,
  ROLES_READ_STARTED,
  ROLES_READ_FULFILLED,
  ROLES_READ_REJECTED,
  readPerms,
  readRoles,
} from '../../../src/actions/authz';

describe('authz action creator', function suite() {
  describe('readPerms', function actionSuite() {
    const mockStore = configureMockStore([thunk]);

    const store = mockStore({
      authz: Immutable.Map(),
      user: Immutable.Map(),
    });

    const config = {};
    const readPermsUrl = '/cspace-services/authorization/permissions?pgSz=0&actGrp=CRUDL';

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

    it('should dispatch PERMS_READ_FULFILLED on success', function test() {
      moxios.stubRequest(readPermsUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(readPerms(config))
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: PERMS_READ_STARTED,
          });

          actions[1].should.deep.equal({
            type: PERMS_READ_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
            meta: {
              config,
            },
          });
        });
    });

    it('should dispatch PERMS_READ_REJECTED on success', function test() {
      moxios.stubRequest(readPermsUrl, {
        status: 400,
        response: {},
      });

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

    it('should not dispatch any action if a read is already pending', function test() {
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

    it('should not dispatch any action if permissions have already been retrieved', function test() {
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

  describe('readRoles', function actionSuite() {
    const mockStore = configureMockStore([thunk]);

    const store = mockStore({
      authz: Immutable.Map(),
      user: Immutable.Map(),
    });

    const readRolesUrl = '/cspace-services/authorization/roles?pgSz=0';

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

    it('should dispatch ROLES_READ_FULFILLED on success', function test() {
      moxios.stubRequest(readRolesUrl, {
        status: 200,
        response: {},
      });

      return store.dispatch(readRoles())
        .then(() => {
          const actions = store.getActions();

          actions.should.have.lengthOf(2);

          actions[0].should.deep.equal({
            type: ROLES_READ_STARTED,
          });

          actions[1].should.deep.equal({
            type: ROLES_READ_FULFILLED,
            payload: {
              status: 200,
              statusText: undefined,
              headers: undefined,
              data: {},
            },
          });
        });
    });

    it('should dispatch ROLES_READ_REJECTED on success', function test() {
      moxios.stubRequest(readRolesUrl, {
        status: 400,
        response: {},
      });

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

    it('should not dispatch any action if a read is already pending', function test() {
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

    it('should not dispatch any action if roles have already been retrieved', function test() {
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
