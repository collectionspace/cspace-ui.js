import client from 'cspace-client';

let cspace;
let session;

export const CSPACE_CONFIGURED = 'CSPACE_CONFIGURED';

export const configureCSpace = (config) => {
  cspace = client(config);

  return {
    type: CSPACE_CONFIGURED,
    payload: config,
  };
};

export const LOGIN_REDIRECTED = 'LOGIN_REDIRECTED';

export const redirectLogin = (replace, attemptedUrl) => dispatch => {
  replace('/login');

  dispatch({
    type: LOGIN_REDIRECTED,
    meta: {
      attemptedUrl,
    },
  });
};

export const RESET_LOGIN = 'RESET_LOGIN';

export const resetLogin = () => dispatch =>
  dispatch({
    type: RESET_LOGIN,
  });

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const login = (username, password) => dispatch => {
  dispatch({
    type: LOGIN_STARTED,
    meta: {
      username,
    },
  });

  session = cspace.session({
    username,
    password,
  });

  session.login()
    .then(response => dispatch({
      type: LOGIN_FULFILLED,
      payload: response,
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

