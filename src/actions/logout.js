import getSession from './cspace';

export const LOGOUT_STARTED = 'LOGOUT_STARTED';
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_STARTED,
  });

  return getSession().logout()
    .then(response => dispatch({
      type: LOGOUT_FULFILLED,
      payload: response,
    }));
};
