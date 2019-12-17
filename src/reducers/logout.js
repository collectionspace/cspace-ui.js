import {
  LOGOUT_STARTED,
  LOGOUT_FULFILLED,
} from '../constants/actionCodes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_STARTED:
      return {
        ...state,
        isPending: true,
        response: null,
      };
    case LOGOUT_FULFILLED:
      return {
        ...state,
        isPending: false,
        response: action.payload,
      };
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
