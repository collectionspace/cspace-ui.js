import getSession, { createSession } from './cspace';
import { loadPrefs } from './prefs';
import { getUserUsername } from '../reducers';

export const AUTH_RENEW_FULFILLED = 'AUTH_RENEW_FULFILLED';
export const AUTH_RENEW_REJECTED = 'AUTH_RENEW_REJECTED';
export const ACCOUNT_PERMS_READ_FULFILLED = 'ACCOUNT_PERMS_READ_FULFILLED';
export const ACCOUNT_PERMS_READ_REJECTED = 'ACCOUNT_PERMS_READ_REJECTED';
export const RESET_LOGIN = 'RESET_LOGIN';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const resetLogin = () => ({
  type: RESET_LOGIN,
});

const renewAuth = (username, password) => (dispatch) => {
  dispatch(createSession(username, password));

  return getSession().login()
    .then(response => dispatch({
      type: AUTH_RENEW_FULFILLED,
      payload: response,
      meta: {
        username,
      },
    }))
    .catch((error) => {
      dispatch({
        type: AUTH_RENEW_REJECTED,
        payload: error,
        meta: {
          username,
        },
      });

      throw error;
    });
};

export const readAccountPerms = config => (dispatch, getState) => {
  const username = getUserUsername(getState());

  if (!username) {
    return Promise.resolve();
  }

  return getSession().read('accounts/0/accountperms')
    .then(response => dispatch({
      type: ACCOUNT_PERMS_READ_FULFILLED,
      payload: response,
      meta: {
        config,
      },
    }))
    .catch((error) => {
      dispatch({
        type: ACCOUNT_PERMS_READ_REJECTED,
        payload: error,
      });

      throw error;
    });
};

export const login = (config, username, password) => (dispatch) => {
  dispatch({
    type: LOGIN_STARTED,
    meta: {
      username,
    },
  });

  return dispatch(renewAuth(username, password))
    .then(() => dispatch(readAccountPerms(config)))
    .then(() => dispatch(loadPrefs()))
    .then(() => dispatch({
      type: LOGIN_FULFILLED,
      meta: {
        username,
      },
    }))
    .catch(error => dispatch({
      type: LOGIN_REJECTED,
      payload: error,
      meta: {
        username,
      },
    }));
};
