import Immutable from 'immutable';

import {
  COLLAPSE_PANEL,
  SET_SEARCH_PAGE_SIZE,
} from '../actions/prefs';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case COLLAPSE_PANEL:
      return state.setIn(['panels', action.meta.recordType, action.meta.name], action.payload);
    case SET_SEARCH_PAGE_SIZE:
      return state.set('searchPageSize', action.payload);
    default:
      return state;
  }
};

export const isPanelCollapsed = (state, recordType, name) =>
  state.getIn(['panels', recordType, name]);

export const getSearchPageSize = state =>
  state.get('searchPageSize');
