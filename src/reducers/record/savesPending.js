import {
  RECORD_SAVE_STARTED,
  RECORD_SAVE_FULFILLED,
  RECORD_SAVE_REJECTED,
} from '../../actions/record';

export default (state = {}, action) => {
  let nextState;

  switch (action.type) {
    case RECORD_SAVE_STARTED:
      return Object.assign({}, state, {
        [action.meta.csid]: true,
      });
    case RECORD_SAVE_FULFILLED:
      nextState = Object.assign({}, state);
      delete nextState[action.meta.csid];

      return nextState;
    case RECORD_SAVE_REJECTED:
      nextState = Object.assign({}, state);
      delete nextState[action.meta.csid];

      return nextState;
    default:
      return state;
  }
};

export const get = (state, csid) => state[csid];
