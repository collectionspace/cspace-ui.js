import Immutable from 'immutable';

import {
  SET_KEYWORD_SEARCH_KEYWORD,
  SET_KEYWORD_SEARCH_RECORD_TYPE,
  SET_KEYWORD_SEARCH_VOCABULARY,
} from '../actions/keywordSearch';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_KEYWORD_SEARCH_KEYWORD:
      return state.set('keyword', action.payload);
    case SET_KEYWORD_SEARCH_RECORD_TYPE:
      return state.set('recordType', action.payload).delete('vocabulary');
    case SET_KEYWORD_SEARCH_VOCABULARY:
      return state.set('vocabulary', action.payload);
    default:
      return state;
  }
};

export function getKeyword(state) {
  return state.get('keyword');
}

export function getRecordType(state) {
  return state.get('recordType');
}

export function getVocabulary(state) {
  return state.get('vocabulary');
}
