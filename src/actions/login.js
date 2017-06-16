import getSession, { createSession } from './cspace';
import { loadPrefs } from './prefs';

export const RESET_LOGIN = 'RESET_LOGIN';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const resetLogin = () => ({
  type: RESET_LOGIN,
});

export const login = (username, password) => (dispatch) => {
  dispatch({
    type: LOGIN_STARTED,
    meta: {
      username,
    },
  });

  dispatch(createSession(username, password));

  return getSession().login()
    .then(response => dispatch({
      type: LOGIN_FULFILLED,
      payload: response,
      meta: {
        username,
      },
    }))
    .then(() => dispatch(loadPrefs()))
    .catch(error => dispatch({
      type: LOGIN_REJECTED,
      payload: error,
      meta: {
        username,
      },
    }));
};
