import Immutable from 'immutable';

import {
  SET_SEARCH_PAGE_ADVANCED,
  SET_SEARCH_PAGE_KEYWORD,
} from '../actions/searchPage';

import {
  SET_SEARCH_PAGE_RECORD_TYPE,
} from '../actions/prefs';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_SEARCH_PAGE_ADVANCED:
      return state.set('advanced', Immutable.fromJS(action.payload));
    case SET_SEARCH_PAGE_KEYWORD:
      return state.set('keyword', action.payload);
    case SET_SEARCH_PAGE_RECORD_TYPE:
      return state.delete('advanced');
    default:
      return state;
  }
};

export const getAdvanced = state => state.get('advanced');
export const getKeyword = state => state.get('keyword');
