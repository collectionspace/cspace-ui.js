import getSession from './cspace';
import { loadPrefs, savePrefs } from './prefs';

export const LOGOUT_STARTED = 'LOGOUT_STARTED';
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_STARTED,
  });

  dispatch(savePrefs());

  return getSession().logout()
    .then(response => dispatch({
      type: LOGOUT_FULFILLED,
      payload: response,
    }))
    .then(() => dispatch(loadPrefs()));
};
