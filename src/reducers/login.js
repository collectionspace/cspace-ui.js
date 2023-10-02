import Immutable from 'immutable';

import {
  AUTH_CODE_URL_CREATED,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  OPEN_MODAL,
  LOGIN_WINDOW_CLOSED,
  LOGIN_WINDOW_OPENED,
  LOGIN_WINDOW_OPEN_FAILED,
} from '../constants/actionCodes';

import { MODAL_LOGIN } from '../constants/modalNames';

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
    case OPEN_MODAL:
      if (action.meta.name === MODAL_LOGIN) {
        return state.clear();
      }

      return state;
    case LOGIN_WINDOW_CLOSED:
      return state
        .set('isWindowOpen', false)
        .set('isWindowOpenFailed', false);
    case LOGIN_WINDOW_OPENED:
      return state
        .set('isWindowOpen', true)
        .set('isWindowOpenFailed', false);
    case LOGIN_WINDOW_OPEN_FAILED:
      return state
        .set('isWindowOpen', false)
        .set('isWindowOpenFailed', true);
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
export const isWindowOpen = (state) => state.get('isWindowOpen');
export const isWindowOpenFailed = (state) => state.get('isWindowOpenFailed');
