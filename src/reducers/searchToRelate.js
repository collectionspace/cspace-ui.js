import Immutable from 'immutable';

import {
  SET_SEARCH_TO_RELATE_ADVANCED,
  SET_SEARCH_TO_RELATE_KEYWORD,
  SET_SEARCH_TO_RELATE_RECORD_TYPE,
  SET_SEARCH_TO_RELATE_VOCABULARY,
} from '../actions/searchToRelate';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_SEARCH_TO_RELATE_ADVANCED:
      return state.set('advanced', Immutable.fromJS(action.payload));
    case SET_SEARCH_TO_RELATE_KEYWORD:
      return state.set('keyword', action.payload);
    case SET_SEARCH_TO_RELATE_RECORD_TYPE:
      return state.set('recordType', action.payload).delete('advanced');
    case SET_SEARCH_TO_RELATE_VOCABULARY:
      return state.setIn(['vocabulary', state.get('recordType')], action.payload);
    default:
      return state;
  }
};

export const getAdvanced = state => state.get('advanced');
export const getKeyword = state => state.get('keyword');
export const getRecordType = state => state.get('recordType');
export const getVocabulary = (state, recordType) => state.getIn(['vocabulary', recordType]);
