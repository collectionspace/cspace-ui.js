import Immutable from 'immutable';

import {
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
} from '../actions/search';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SEARCH_STARTED:
      return state.set('isPending', true);
    case SEARCH_FULFILLED:
      return (
        state
          .set('isPending', false)
          .set('result', Immutable.fromJS(action.payload.data))
      );
    case SEARCH_REJECTED:
      return (
        state
          .set('isPending', false)
          .set('error', action.payload)
      );
    default:
      return state;
  }
};

export function isPending(state) {
  return state.get('isPending');
}

export function getResult(state) {
  return state.get('result');
}

export function getError(state) {
  return state.get('error');
}
