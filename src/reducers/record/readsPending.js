import {
  RECORD_READ_STARTED,
  RECORD_READ_FULFILLED,
  RECORD_READ_REJECTED,
} from '../../actions/record';

export default (state = {}, action) => {
  let nextState;

  switch (action.type) {
    case RECORD_READ_STARTED:
      return Object.assign({}, state, {
        [action.meta.csid]: true,
      });
    case RECORD_READ_FULFILLED:
      nextState = Object.assign({}, state);
      delete nextState[action.meta.csid];

      return nextState;
    case RECORD_READ_REJECTED:
      nextState = Object.assign({}, state);
      delete nextState[action.meta.csid];

      return nextState;
    default:
      return state;
  }
};

export const get = (state, csid) => state[csid];
