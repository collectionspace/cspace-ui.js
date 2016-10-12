import getSession from './login';

export const LOGOUT_STARTED = 'LOGOUT_STARTED';
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';
export const LOGOUT_REJECTED = 'LOGOUT_REJECTED';

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_STARTED,
  });

  getSession().logout()
    .then(response => dispatch({
      type: LOGOUT_FULFILLED,
      payload: response,
    }))
    .catch(error => dispatch({
      type: LOGOUT_REJECTED,
      payload: error,
    }));
};
