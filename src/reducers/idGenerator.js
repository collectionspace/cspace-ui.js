import Immutable from 'immutable';

import {
  ADD_ID_GENERATORS,
  READ_ID_GENERATOR_FULFILLED,
  LOGOUT_FULFILLED,
} from '../constants/actionCodes';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case ADD_ID_GENERATORS:
      return state.mergeDeep(Immutable.fromJS(action.payload));
    case READ_ID_GENERATOR_FULFILLED:
      return state.setIn([
        action.meta.idGeneratorName,
        'sample',
      ], action.payload.data.idgenerator.displayid);
    case LOGOUT_FULFILLED:
      return state.map((idGeneratorState) => idGeneratorState.delete('sample'));
    default:
      return state;
  }
};

export function get(state, idGeneratorName) {
  return state.get(idGeneratorName);
}
