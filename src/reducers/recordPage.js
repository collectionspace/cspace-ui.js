import Immutable from 'immutable';

import {
  SET_RECORD_PAGE_PRIMARY_CSID,
} from '../actions/recordPage';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_RECORD_PAGE_PRIMARY_CSID:
      return state.set('primaryCsid', Immutable.fromJS(action.payload));
    default:
      return state;
  }
};

export const getPrimaryCsid = state => state.get('primaryCsid');
