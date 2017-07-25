import Immutable from 'immutable';

import {
  RESET_LOGIN,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
} from '../actions/login';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case RESET_LOGIN:
      return state.clear();
    case LOGIN_STARTED:
      return state
        .set('isPending', true)
        .set('username', action.meta.username)
        .delete('error');
    case LOGIN_FULFILLED:
      return state
        .delete('isPending')
        .set('username', action.meta.username)
        .delete('error');
    case LOGIN_REJECTED:
      return state
        .delete('isPending')
        .set('username', action.meta.username)
        .set('error', Immutable.fromJS(action.payload));
    default:
      return state;
  }
};

export const isPending = state => state.get('isPending');
export const getUsername = state => state.get('username');
export const getError = state => state.get('error');
