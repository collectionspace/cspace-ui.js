import {
  RECORD_READ_FULFILLED,
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case RECORD_READ_FULFILLED:
      return Object.assign({}, state, {
        [action.meta.csid]: action.payload.data,
      });
    default:
      return state;
  }
};

export function getData(state, csid) {
  return state[csid];
}
