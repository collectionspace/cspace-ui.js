import { createSession, setSession } from './cspace';
import { readAccountPerms } from './account';
import { closeModal } from './notification';
import { loadPrefs, savePrefs } from './prefs';
import { getUserUsername } from '../reducers';

export const AUTH_RENEW_FULFILLED = 'AUTH_RENEW_FULFILLED';
export const AUTH_RENEW_REJECTED = 'AUTH_RENEW_REJECTED';
export const RESET_LOGIN = 'RESET_LOGIN';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const resetLogin = username => ({
  type: RESET_LOGIN,
  meta: {
    username,
  },
});

const renewAuth = (username, password) => (dispatch) => {
  const session = createSession(username, password);

  return session.login()
    .then((response) => {
      dispatch(setSession(session));

      return dispatch({
        type: AUTH_RENEW_FULFILLED,
        payload: response,
        meta: {
          username,
        },
      });
    })
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

export const login = (config, username, password) => (dispatch, getState) => {
  const prevUsername = getUserUsername(getState());

  dispatch(savePrefs());

  dispatch({
    type: LOGIN_STARTED,
    meta: {
      username,
    },
  });

  return dispatch(renewAuth(username, password))
    .then(() => dispatch(readAccountPerms(config, username)))
    .then(() => dispatch(loadPrefs(username)))
    // The login modal may be open. If login succeeds, close it.
    .then(() => dispatch(closeModal()))
    .then(() => dispatch({
      type: LOGIN_FULFILLED,
      meta: {
        prevUsername,
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
