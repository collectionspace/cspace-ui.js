import {
  RESET_LOGIN,
  LOGIN_REDIRECTED,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RESET_LOGIN:
      console.log('resetting login');
      return Object.assign({}, state, {
        isPending: false,
        username: null,
        response: null,
        error: null,
      });
    case LOGIN_REDIRECTED:
      return Object.assign({}, state, {
        continuation: action.meta.attemptedUrl,
      });
    case LOGIN_STARTED:
      return Object.assign({}, state, {
        isPending: true,
        username: action.meta.username,
        response: null,
        error: null,
      });
    case LOGIN_FULFILLED:
      return Object.assign({}, state, {
        isPending: false,
        username: action.meta.username,
        response: action.payload,
        error: null,
      });
    case LOGIN_REJECTED:
      return Object.assign({}, state, {
        isPending: false,
        username: action.meta.username,
        response: null,
        error: action.payload,
      });
    default:
      return state;
  }
};

export function getContinuation(state) {
  return state.continuation;
}

export function isPending(state) {
  return state.isPending;
}

export function getUsername(state) {
  return state.username;
}

export function getResponse(state) {
  return state.response;
}

export function getError(state) {
  return state.error;
}
