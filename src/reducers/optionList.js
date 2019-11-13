import Immutable from 'immutable';

import {
  ADD_OPTION_LISTS,
  DELETE_OPTION_LIST,
} from '../constants/actionCodes';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ADD_OPTION_LISTS:
      return Object.keys(action.payload).reduce(
        (newState, key) => newState.set(key, action.payload[key]),
        state,
      );
    case DELETE_OPTION_LIST:
      return state.delete(action.payload);
    default:
      return state;
  }
};

export const get = (state, optionListName) => state.get(optionListName);
