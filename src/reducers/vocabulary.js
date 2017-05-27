import {
  READ_VOCABULARY_ITEMS_STARTED,
  READ_VOCABULARY_ITEMS_FULFILLED,
  READ_VOCABULARY_ITEMS_REJECTED,
} from '../actions/vocabulary';

export default (state = {}, action) => {
  switch (action.type) {
    case READ_VOCABULARY_ITEMS_STARTED:
      return Object.assign({}, state, {
        [action.meta.vocabulary]: {
          isReadPending: true,
          items: null,
        },
      });
    case READ_VOCABULARY_ITEMS_FULFILLED:
      return Object.assign({}, state, {
        [action.meta.vocabulary]: {
          items: action.payload.data['ns2:abstract-common-list']['list-item'],
        },
      });
    case READ_VOCABULARY_ITEMS_REJECTED:
      return Object.assign({}, state, {
        [action.meta.vocabulary]: {
          error: action.payload,
        },
      });
    default:
      return state;
  }
};

export function get(state, vocabulary) {
  return state[vocabulary];
}
