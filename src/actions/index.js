/* global window */

import client from 'cspace-client';
import { getRecordData } from '../reducers';
import prepareRecordData from '../helpers/prepareRecordData';

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

export const CREATE_NEW_RECORD = 'CREATE_NEW_RECORD';

export const createNewRecord = (serviceConfig) => (dispatch) => {
  // TODO: Accept csid to clone.

  // Force this to be async, to be consistent with reading an existing record.

  window.setTimeout(() => {
    dispatch({
      type: CREATE_NEW_RECORD,
      meta: {
        serviceConfig,
      },
    });
  }, 0);
};

export const RECORD_READ_STARTED = 'RECORD_READ_STARTED';
export const RECORD_READ_FULFILLED = 'RECORD_READ_FULFILLED';
export const RECORD_READ_REJECTED = 'RECORD_READ_REJECTED';

export const readRecord = (serviceConfig, csid) => (dispatch) => {
  dispatch({
    type: RECORD_READ_STARTED,
    meta: {
      serviceConfig,
      csid,
    },
  });

  const serviceName = serviceConfig.name;

  session.read(`${serviceName}/${csid}`)
    .then(response => dispatch({
      type: RECORD_READ_FULFILLED,
      payload: response,
      meta: {
        serviceConfig,
        csid,
      },
    }))
    .catch(error => dispatch({
      type: RECORD_READ_REJECTED,
      payload: error,
      meta: {
        serviceConfig,
        csid,
      },
    }));
};

export const RECORD_SAVE_STARTED = 'RECORD_SAVE_STARTED';
export const RECORD_SAVE_FULFILLED = 'RECORD_SAVE_FULFILLED';
export const RECORD_SAVE_REJECTED = 'RECORD_SAVE_REJECTED';

export const saveRecord = (recordType, serviceConfig, csid, replace) => (dispatch, getState) => {
  dispatch({
    type: RECORD_SAVE_STARTED,
    meta: {
      serviceConfig,
      csid,
    },
  });

  const serviceName = serviceConfig.name;
  const data = getRecordData(getState(), csid);

  const config = {
    data: prepareRecordData(data).toJS(),
  };

  const save = csid
    ? session.update(`${serviceName}/${csid}`, config)
    : session.create(serviceName, config);

  save
    .then(response => {
      dispatch({
        type: RECORD_SAVE_FULFILLED,
        payload: response,
        meta: {
          serviceConfig,
          csid,
        },
      });

      if (response.status === 201 && response.headers.location) {
        // Redirect to the new record.
        const location = response.headers.location;
        const newRecordCsid = location.substring(location.lastIndexOf('/') + 1);

        replace(`/record/${recordType}/${newRecordCsid}`);
      }
    })
    .catch(error => dispatch({
      type: RECORD_SAVE_REJECTED,
      payload: error,
      meta: {
        serviceConfig,
        csid,
      },
    }));
};

export const ADD_FIELD_INSTANCE = 'ADD_FIELD_INSTANCE';
export const DELETE_FIELD_VALUE = 'DELETE_FIELD_VALUE';
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';

export const addFieldInstance = (csid, path) => (dispatch) => {
  dispatch({
    type: ADD_FIELD_INSTANCE,
    meta: {
      csid,
      path,
    },
  });
};

export const deleteFieldValue = (csid, path) => (dispatch) => {
  dispatch({
    type: DELETE_FIELD_VALUE,
    meta: {
      csid,
      path,
    },
  });
};

export const setFieldValue = (csid, path, value) => (dispatch) => {
  dispatch({
    type: SET_FIELD_VALUE,
    payload: value,
    meta: {
      csid,
      path,
    },
  });
};
