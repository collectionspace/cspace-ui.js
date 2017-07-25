import Immutable from 'immutable';
import get from 'lodash/get';

import {
  CSPACE_CONFIGURED,
} from '../actions/cspace';

import {
  ACCOUNT_PERMS_READ_FULFILLED,
  LOGIN_FULFILLED,
} from '../actions/login';

import {
  LOGOUT_FULFILLED,
} from '../actions/logout';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ACCOUNT_PERMS_READ_FULFILLED:
      return (
        state
          .set('screenName', get(action.payload.data, ['ns2:account_permission', 'account', 'screenName']))
          // TODO: Process the payload into something usable.
          // .set('perms', Immutable.fromJS(action.payload.data))
      );
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
export const getScreenName = state => state.get('screenName');
