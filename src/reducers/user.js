import { LOGIN_FULFILLED } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_FULFILLED:
      return Object.assign({}, state, {
        username: action.meta.username,
      });
    default:
      return state;
  }
};

export function getUsername(state) {
  return state.username;
}
