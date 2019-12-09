import Immutable from 'immutable';
import get from 'lodash/get';
import { getPermissions } from '../helpers/permissionHelpers';

import {
  CSPACE_CONFIGURED,
  ACCOUNT_PERMS_READ_FULFILLED,
  ACCOUNT_ROLES_READ_FULFILLED,
  SET_ACCOUNT_PERMS,
  AUTH_RENEW_FULFILLED,
  LOGIN_FULFILLED,
  LOGOUT_FULFILLED,
  PREFS_LOADED,
} from '../constants/actionCodes';

const handleAccountPermsReadFulfilled = (state, action) => {
  const {
    config,
  } = action.meta;

  const {
    data,
  } = action.payload;

  const account = Immutable.fromJS(get(data, ['ns2:account_permission', 'account']));
  const accountTenantId = account.get('tenantId');

  const perms = (accountTenantId === config.tenantId)
    ? getPermissions(action.meta.config, data)
    : Immutable.Map();

  return (
    state
      .set('account', account)
      .set('perms', perms)
  );
};

const handleAccountRolesReadFulfilled = (state, action) => {
  const {
    data,
  } = action.payload;

  let roles = get(data, ['ns2:account_role', 'role']);

  if (roles) {
    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    return state.set('roleNames', Immutable.List(roles.map(role => role.roleName)));
  }

  return state;
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ACCOUNT_PERMS_READ_FULFILLED:
      return handleAccountPermsReadFulfilled(state, action);
    case ACCOUNT_ROLES_READ_FULFILLED:
      return handleAccountRolesReadFulfilled(state, action);
    case AUTH_RENEW_FULFILLED:
      return handleAccountPermsReadFulfilled(state, action);
    case CSPACE_CONFIGURED:
      return state.set('username', action.payload.username);
    case LOGIN_FULFILLED:
      return state.set('username', action.meta.username);
    case LOGOUT_FULFILLED:
      return state.clear();
    case SET_ACCOUNT_PERMS:
      // There is no action creator that creates this action, but it's useful for testing via Redux
      // dev tools.

      return state.set('perms', state.get('perms').mergeDeep(Immutable.fromJS(action.payload)));
    case PREFS_LOADED:
      return state.set('prefsLoaded', true);
    default:
      return state;
  }
};

export const getAccountId = state => state.getIn(['account', 'accountId']);
export const getUsername = state => state.get('username');
export const getScreenName = state => state.getIn(['account', 'screenName']);
export const getUserId = state => state.getIn(['account', 'userId']);
export const getPerms = state => state.get('perms');
export const getRoleNames = state => state.get('roleNames');
export const arePrefsLoaded = state => (state.get('prefsLoaded') === true);
