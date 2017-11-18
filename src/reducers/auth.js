import Immutable from 'immutable';
import get from 'lodash/get';
import { getRecordTypeConfigByServicePath } from '../helpers/configHelpers';

import {
  PERMS_READ_STARTED,
  PERMS_READ_FULFILLED,
  PERMS_READ_REJECTED,
} from '../actions/auth';

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

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case PERMS_READ_STARTED:
      return state.set('isPermsReadPending', true);
    case PERMS_READ_FULFILLED:
      return handlePermsReadFulfilled(state, action);
    case PERMS_READ_REJECTED:
      return state.delete('isPermsReadPending');
    default:
      return state;
  }
};

export const isPermsReadPending = state => state.get('isPermsReadPending');
export const getResourceNames = state => state.get('resourceNames');
