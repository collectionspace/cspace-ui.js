import Immutable from 'immutable';

import {
  CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID,
  SET_RELATED_RECORD_BROWSER_RELATED_CSID,
} from '../actions/recordBrowser';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case CLEAR_RELATED_RECORD_BROWSER_RELATED_CSID:
      return state.deleteIn(['relatedRecordBrowser', 'relatedCsid']);
    case SET_RELATED_RECORD_BROWSER_RELATED_CSID:
      return state.setIn(
        ['relatedRecordBrowser', 'relatedCsid', action.meta.recordType], action.payload
      );
    default:
      return state;
  }
};

export const getRelatedRecordBrowserRelatedCsid = (state, recordType) =>
  state.getIn(['relatedRecordBrowser', 'relatedCsid', recordType]);
