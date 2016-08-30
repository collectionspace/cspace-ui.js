import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import cspace from './cspace';
import user, * as fromUser from './user';
import login, * as fromLogin from './login';
import logout, * as fromLogout from './logout';

export default combineReducers({
  routing,
  cspace,
  login,
  logout,
  user,
});

export function getUserUsername(state) {
  return fromUser.getUsername(state.user);
}

export function getLoginContinuation(state) {
  return fromLogin.getContinuation(state.login);
}

export function getLoginUsername(state) {
  return fromLogin.getUsername(state.login);
}

export function isLoginPending(state) {
  return fromLogin.isPending(state.login);
}

export function getLoginResponse(state) {
  return fromLogin.getResponse(state.login);
}

export function getLoginError(state) {
  return fromLogin.getError(state.login);
}

export function isLogoutPending(state) {
  return fromLogout.isPending(state.logout);
}

export function getLogoutResponse(state) {
  return fromLogout.getResponse(state.logout);
}

export function getLogoutError(state) {
  return fromLogout.getError(state.logout);
}
