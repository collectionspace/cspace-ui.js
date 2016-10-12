/* global window */

import getSession from './login';
import { getRecordData } from '../reducers';
import { prepareForSending } from '../helpers/recordDataHelpers';

export const CREATE_NEW_RECORD = 'CREATE_NEW_RECORD';
export const RECORD_READ_STARTED = 'RECORD_READ_STARTED';
export const RECORD_READ_FULFILLED = 'RECORD_READ_FULFILLED';
export const RECORD_READ_REJECTED = 'RECORD_READ_REJECTED';
export const RECORD_SAVE_STARTED = 'RECORD_SAVE_STARTED';
export const RECORD_SAVE_FULFILLED = 'RECORD_SAVE_FULFILLED';
export const RECORD_SAVE_REJECTED = 'RECORD_SAVE_REJECTED';
export const ADD_FIELD_INSTANCE = 'ADD_FIELD_INSTANCE';
export const DELETE_FIELD_VALUE = 'DELETE_FIELD_VALUE';
export const MOVE_FIELD_VALUE = 'MOVE_FIELD_VALUE';
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';

export const createNewRecord = serviceConfig => (dispatch) => {
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

export const readRecord = (serviceConfig, csid) => (dispatch) => {
  dispatch({
    type: RECORD_READ_STARTED,
    meta: {
      serviceConfig,
      csid,
    },
  });

  const serviceName = serviceConfig.name;

  getSession().read(`${serviceName}/${csid}`)
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
    data: prepareForSending(data).toJS(),
  };

  const save = csid
    ? getSession().update(`${serviceName}/${csid}`, config)
    : getSession().create(serviceName, config);

  save
    .then((response) => {
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

export const addFieldInstance = (csid, path) => ({
  type: ADD_FIELD_INSTANCE,
  meta: {
    csid,
    path,
  },
});

export const deleteFieldValue = (csid, path) => ({
  type: DELETE_FIELD_VALUE,
  meta: {
    csid,
    path,
  },
});

export const moveFieldValue = (csid, path, newPosition) => ({
  type: MOVE_FIELD_VALUE,
  meta: {
    csid,
    path,
    newPosition,
  },
});

export const setFieldValue = (csid, path, value) => ({
  type: SET_FIELD_VALUE,
  payload: value,
  meta: {
    csid,
    path,
  },
});
