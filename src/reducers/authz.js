import Immutable from 'immutable';
import get from 'lodash/get';
import { getRecordTypeConfigByServicePath } from '../helpers/configHelpers';

import {
  PERMS_READ_STARTED,
  PERMS_READ_FULFILLED,
  PERMS_READ_REJECTED,
  ROLES_READ_STARTED,
  ROLES_READ_FULFILLED,
  ROLES_READ_REJECTED,
} from '../actions/authz';

import {
  RECORD_CREATED,
  RECORD_DELETE_FULFILLED,
} from '../actions/record';

const handlePermsReadFulfilled = (state, action) => {
  const {
    config,
  } = action.meta;

  let perms = get(action.payload.data, ['ns2:permissions_list', 'permission']);

  if (perms && !Array.isArray(perms)) {
    perms = [perms];
  }

  const resourceNames = perms
    .filter(perm => getRecordTypeConfigByServicePath(config, perm.resourceName))
    .map(perm => perm.resourceName);

  return (
    state
      .set('resourceNames', Immutable.List(resourceNames))
      .delete('isPermsReadPending')
  );
};

const handleRolesReadFulfilled = (state, action) => {
  let roles = get(action.payload.data, ['ns2:roles_list', 'role']);

  if (roles && !Array.isArray(roles)) {
    roles = [roles];
  }

  return (
    state
      .set('roles', Immutable.fromJS(roles))
      .delete('isRolesReadPending')
  );
};

const handleRecordCreated = (state, action) => {
  if (action.meta.recordTypeConfig.name === 'authrole') {
    return state.delete('roles');
  }

  return state;
};

const handleRecordDeleteFulfilled = (state, action) => {
  if (action.meta.recordTypeConfig.name === 'authrole') {
    return state.delete('roles');
  }

  return state;
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case PERMS_READ_STARTED:
      return state.set('isPermsReadPending', true);
    case PERMS_READ_FULFILLED:
      return handlePermsReadFulfilled(state, action);
    case PERMS_READ_REJECTED:
      return state.delete('isPermsReadPending');
    case ROLES_READ_STARTED:
      return state.set('isRolesReadPending', true);
    case ROLES_READ_FULFILLED:
      return handleRolesReadFulfilled(state, action);
    case ROLES_READ_REJECTED:
      return state.delete('isRolesReadPending');
    case RECORD_CREATED:
      return handleRecordCreated(state, action);
    case RECORD_DELETE_FULFILLED:
      return handleRecordDeleteFulfilled(state, action);
    default:
      return state;
  }
};

export const isPermsReadPending = state => state.get('isPermsReadPending');
export const getResourceNames = state => state.get('resourceNames');

export const isRolesReadPending = state => state.get('isRolesReadPending');
export const getRoles = state => state.get('roles');
