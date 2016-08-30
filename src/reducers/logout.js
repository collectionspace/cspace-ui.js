import {
  LOGOUT_STARTED,
  LOGOUT_FULFILLED,
  LOGOUT_REJECTED,
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_STARTED:
      return Object.assign({}, state, {
        isPending: true,
        response: null,
        error: null,
      });
    case LOGOUT_FULFILLED:
      return Object.assign({}, state, {
        isPending: false,
        response: action.payload,
        error: null,
      });
    case LOGOUT_REJECTED:
      return Object.assign({}, state, {
        isPending: false,
        response: null,
        error: action.payload,
      });
    default:
      return state;
  }
};

export function isPending(state) {
  return state.isPending;
}

export function getResponse(state) {
  return state.response;
}

export function getError(state) {
  return state.error;
}
