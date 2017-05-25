import Immutable from 'immutable';

import {
  CSPACE_CONFIGURED,
} from '../actions/cspace';

import {
  RESET_LOGIN,
  LOGIN_REDIRECTED,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
} from '../actions/login';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case RESET_LOGIN:
      return state.clear();
    case LOGIN_REDIRECTED:
      return state.set('continuation', action.meta.attemptedUrl);
    case LOGIN_STARTED:
      return state
        .set('isPending', true)
        .set('username', action.meta.username)
        .delete('response')
        .delete('error');
    case LOGIN_FULFILLED:
      return state
        .delete('isPending')
        .set('username', action.meta.username)
        .set('response', Immutable.fromJS(action.payload))
        .delete('error');
    case LOGIN_REJECTED:
      return state
        .delete('isPending')
        .set('username', action.meta.username)
        .delete('response')
        .set('error', Immutable.fromJS(action.payload));
    case CSPACE_CONFIGURED:
      return state
        .set('username', action.payload.username);
    default:
      return state;
  }
};

export const getContinuation = state => state.get('continuation');
export const isPending = state => state.get('isPending');
export const getUsername = state => state.get('username');
export const getResponse = state => state.get('response');
export const getError = state => state.get('error');
