import { CSPACE_CONFIGURED } from '../actions';

export default (state = {}, action) => {
  switch(action.type) {
    case CSPACE_CONFIGURED:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
};

export function getConfig(state) {
  return state;
}
