import Immutable from 'immutable';

import {
  SET_QUICK_SEARCH_KEYWORD,
} from '../constants/actionCodes';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_QUICK_SEARCH_KEYWORD:
      return state.set('keyword', action.payload);
    default:
      return state;
  }
};

export function getKeyword(state) {
  return state.get('keyword');
}
