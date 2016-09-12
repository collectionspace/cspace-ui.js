import client from 'cspace-client';

let cspace;
let session;

export const CSPACE_CONFIGURED = 'CSPACE_CONFIGURED';

export const configureCSpace = (config) => {
  cspace = client(config);
  session = cspace.session();

  return {
    type: CSPACE_CONFIGURED,
    payload: session.config(),
  };
};

export const LOGIN_REDIRECTED = 'LOGIN_REDIRECTED';

export const redirectLogin = (replace, attemptedUrl) => (dispatch) => {
  replace('/login');

  dispatch({
    type: LOGIN_REDIRECTED,
    meta: {
      attemptedUrl,
    },
  });
};

export const RESET_LOGIN = 'RESET_LOGIN';

export const resetLogin = () => dispatch => dispatch({
  type: RESET_LOGIN,
});

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_FULFILLED = 'LOGIN_FULFILLED';
export const LOGIN_REJECTED = 'LOGIN_REJECTED';

export const login = (username, password) => (dispatch) => {
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

export const LOGOUT_STARTED = 'LOGOUT_STARTED';
export const LOGOUT_FULFILLED = 'LOGOUT_FULFILLED';
export const LOGOUT_REJECTED = 'LOGOUT_REJECTED';

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_STARTED,
  });

  session.logout()
    .then(response => dispatch({
      type: LOGOUT_FULFILLED,
      payload: response,
    }))
    .catch(error => dispatch({
      type: LOGOUT_REJECTED,
      payload: error,
    }));
};

export const RECORD_READ_STARTED = 'RECORD_READ_STARTED';
export const RECORD_READ_FULFILLED = 'RECORD_READ_FULFILLED';
export const RECORD_READ_REJECTED = 'RECORD_READ_REJECTED';

export const readRecord = (service, csid) => (dispatch) => {
  dispatch({
    type: RECORD_READ_STARTED,
    meta: {
      service,
      csid,
    },
  });

  session.read(`${service}/${csid}`)
    .then(result => dispatch({
      type: RECORD_READ_FULFILLED,
      payload: result,
      meta: {
        service,
        csid,
      },
    }))
    .catch(error => dispatch({
      type: RECORD_READ_REJECTED,
      payload: error,
      meta: {
        service,
        csid,
      },
    }));
};
