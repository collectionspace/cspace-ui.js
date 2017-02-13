/* global window */

import getSession from './cspace';
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
export const REVERT_RECORD = 'REVERT_RECORD';

const doRead = (recordTypeConfig, vocabularyConfig, csid) => {
  const recordServicePath = recordTypeConfig.serviceConfig.servicePath;

  const vocabularyServicePath = vocabularyConfig
    ? vocabularyConfig.serviceConfig.servicePath
    : null;

  const pathParts = [recordServicePath];

  if (vocabularyServicePath) {
    pathParts.push(vocabularyServicePath);
    pathParts.push('items');
  }

  pathParts.push(csid);

  const path = pathParts.join('/');

  const config = {
    params: {
      wf_deleted: false,
    },
  };

  return getSession().read(path, config);
};

export const readRecord = (recordTypeConfig, vocabularyConfig, csid) => (dispatch) => {
  dispatch({
    type: RECORD_READ_STARTED,
    meta: {
      recordTypeConfig,
      csid,
    },
  });

  return doRead(recordTypeConfig, vocabularyConfig, csid)
    .then(response => dispatch({
      type: RECORD_READ_FULFILLED,
      payload: response,
      meta: {
        recordTypeConfig,
        csid,
      },
    }))
    .catch(error => dispatch({
      type: RECORD_READ_REJECTED,
      payload: error,
      meta: {
        recordTypeConfig,
        csid,
      },
    }));
};

export const createNewRecord = (recordTypeConfig, vocabularyConfig, cloneCsid) =>
  (dispatch, getState) => {
    let readClone;

    if (cloneCsid) {
      const data = getRecordData(getState(), cloneCsid);

      if (!data) {
        // We don't have data for the record to be cloned. Read it first.

        readClone = dispatch(readRecord(recordTypeConfig, vocabularyConfig, cloneCsid));
      }
    }

    if (!readClone) {
      // There's nothing to clone, or we already have the record data to be cloned. Perform an
      // async noop, so this function will be consistently async.

      readClone = new Promise((resolve) => {
        window.setTimeout(() => {
          resolve();
        }, 0);
      });
    }

    return (
      readClone.then(() => dispatch({
        type: CREATE_NEW_RECORD,
        meta: {
          recordTypeConfig,
          cloneCsid,
        },
      }))
    );
  };

export const saveRecord = (recordTypeConfig, vocabularyConfig, csid, replace) =>
  (dispatch, getState) => {
    dispatch({
      type: RECORD_SAVE_STARTED,
      meta: {
        recordTypeConfig,
        csid,
      },
    });

    const recordServicePath = recordTypeConfig.serviceConfig.servicePath;

    const vocabularyServicePath = vocabularyConfig
      ? vocabularyConfig.serviceConfig.servicePath
      : null;

    const pathParts = [recordServicePath];

    if (vocabularyServicePath) {
      pathParts.push(vocabularyServicePath);
      pathParts.push('items');
    }

    if (csid) {
      pathParts.push(csid);
    }

    const path = pathParts.join('/');

    const data = getRecordData(getState(), csid);

    const config = {
      data: prepareForSending(data).toJS(),
    };

    let savePromise;

    if (csid) {
      savePromise = getSession().update(path, config)
        // Need to read the record after update, because the update response doesn't include
        // collectionspace_core.
        .then(() => doRead(recordTypeConfig, vocabularyConfig, csid))
        .then(response => dispatch({
          type: RECORD_SAVE_FULFILLED,
          payload: response,
          meta: {
            recordTypeConfig,
            csid,
          },
        }));
    } else {
      savePromise = getSession().create(path, config)
        .then((response) => {
          if (response.status === 201 && response.headers.location) {
            // Redirect to the new record.

            const location = response.headers.location;
            const newRecordCsid = location.substring(location.lastIndexOf('/') + 1);

            const vocabularyPath = vocabularyConfig
              ? `${vocabularyConfig.name}/`
              : '';

            replace(`/record/${recordTypeConfig.name}/${vocabularyPath}${newRecordCsid}`);
          }

          return dispatch({
            type: RECORD_SAVE_FULFILLED,
            payload: response,
            meta: {
              recordTypeConfig,
              csid,
            },
          });
        });
    }

    return savePromise
      .catch(error => dispatch({
        type: RECORD_SAVE_REJECTED,
        payload: error,
        meta: {
          recordTypeConfig,
          csid,
        },
      }));
  };

export const addFieldInstance = (recordTypeConfig, csid, path) => ({
  type: ADD_FIELD_INSTANCE,
  meta: {
    csid,
    path,
    recordTypeConfig,
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

export const revertRecord = csid => ({
  type: REVERT_RECORD,
  meta: {
    csid,
  },
});
