import Immutable from 'immutable';

import {
  CSPACE_CONFIGURED,
  SYSTEM_INFO_READ_FULFILLED,
  SYSTEM_INFO_READ_REJECTED,
} from '../constants/actionCodes';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case CSPACE_CONFIGURED:
      return state.set('config', Immutable.fromJS(action.payload));
    case SYSTEM_INFO_READ_FULFILLED:
      return state.set('systemInfo', Immutable.fromJS(action.payload.data));
    case SYSTEM_INFO_READ_REJECTED:
      return state.set('systemInfo', Immutable.fromJS({
        error: action.payload,
      }));
    default:
      return state;
  }
};

export const getConfig = state => state.get('config');

export const getSystemInfo = state => state.get('systemInfo');
