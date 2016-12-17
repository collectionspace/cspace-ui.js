import {
  ADD_OPTION_LISTS,
} from '../actions/optionList';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_OPTION_LISTS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export function get(state, optionListName) {
  return state[optionListName];
}
