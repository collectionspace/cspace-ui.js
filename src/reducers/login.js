import Immutable from 'immutable';

import {
  AUTH_CODE_URL_CREATED,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
} from '../constants/actionCodes';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case AUTH_CODE_URL_CREATED:
      return state.clear()
        .set('authCodeUrl', action.payload);
    case LOGIN_STARTED:
      return state.clear()
        .set('isPending', true);
    case LOGIN_FULFILLED:
      return state.clear()
        .set('isSuccess', true)
        .set('landingPath', action.meta.landingPath)
        .set('username', action.meta.username);
    case LOGIN_REJECTED:
      return state.clear()
        .set('error', Immutable.Map({
          code: action.payload.code,
          error: action.payload.error,
        }));
    default:
      return state;
  }
};

export const isPending = (state) => state.get('isPending');
export const isSuccess = (state) => state.get('isSuccess');
export const getLandingPath = (state) => state.get('landingPath');
export const getUsername = (state) => state.get('username');
export const getError = (state) => state.get('error');
export const getAuthCodeUrl = (state) => state.get('authCodeUrl');
