import {
  ADD_OPTIONS,
} from '../actions/options';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_OPTIONS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export function get(state, optionListName) {
  return state[optionListName];
}
