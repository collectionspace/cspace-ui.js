import Immutable from 'immutable';
import get from 'lodash/get';
import { getPermissions } from '../helpers/permissionHelpers';

import {
  ACCOUNT_PERMS_READ_FULFILLED,
} from '../actions/account';

import {
  CSPACE_CONFIGURED,
} from '../actions/cspace';

import {
  LOGIN_FULFILLED,
} from '../actions/login';

import {
  LOGOUT_FULFILLED,
} from '../actions/logout';

const handleAccountPermsReadFulfilled = (state, action) => {
  const {
    data,
  } = action.payload;

  const account = Immutable.fromJS(get(data, ['ns2:account_permission', 'account']));
  const perms = getPermissions(action.meta.config, data);

  return (
    state
      .set('account', account)
      .set('perms', perms)
  );
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ACCOUNT_PERMS_READ_FULFILLED:
      return handleAccountPermsReadFulfilled(state, action);
    case CSPACE_CONFIGURED:
      return state.set('username', action.payload.username);
    case LOGIN_FULFILLED:
      return state.set('username', action.meta.username);
    case LOGOUT_FULFILLED:
      return state.delete('username');
    default:
      return state;
  }
};

export const getUsername = state => state.get('username');
export const getScreenName = state => state.getIn(['account', 'screenName']);
export const getPerms = state => state.get('perms');
