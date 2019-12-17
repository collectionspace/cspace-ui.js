import getSession from '../helpers/session';
import { computeRecordData, validateRecordData } from './record';
import { getIDGenerator } from '../reducers';

import {
  ADD_ID_GENERATORS,
  READ_ID_GENERATOR_STARTED,
  READ_ID_GENERATOR_FULFILLED,
  READ_ID_GENERATOR_REJECTED,
  CREATE_ID_STARTED,
  CREATE_ID_FULFILLED,
  CREATE_ID_REJECTED,
} from '../constants/actionCodes';

export const addIDGenerators = (idGenerators) => ({
  type: ADD_ID_GENERATORS,
  payload: idGenerators,
});

export const readIDGenerator = (idGeneratorName) => (dispatch, getState) => {
  let idGeneratorCsid = null;

  const idGenerator = getIDGenerator(getState(), idGeneratorName);

  if (idGenerator) {
    idGeneratorCsid = idGenerator.get('csid');
  }

  if (!idGeneratorCsid) {
    return null;
  }

  dispatch({
    type: READ_ID_GENERATOR_STARTED,
    meta: {
      idGeneratorName,
    },
  });

  const config = {
    params: {
      wf_deleted: false,
    },
  };

  return getSession().read(`idgenerators/${idGeneratorCsid}`, config)
    .then((response) => dispatch({
      type: READ_ID_GENERATOR_FULFILLED,
      payload: response,
      meta: {
        idGeneratorName,
      },
    }))
    .catch((error) => dispatch({
      type: READ_ID_GENERATOR_REJECTED,
      payload: error,
      meta: {
        idGeneratorName,
      },
    }));
};

export const createID = (recordTypeConfig, idGeneratorName, csid, path) => (dispatch, getState) => {
  let idGeneratorCsid = null;

  const idGenerator = getIDGenerator(getState(), idGeneratorName);

  if (idGenerator) {
    idGeneratorCsid = idGenerator.get('csid');
  }

  if (!idGeneratorCsid) {
    return null;
  }

  dispatch({
    type: CREATE_ID_STARTED,
    meta: {
      recordTypeConfig,
      idGeneratorName,
      csid,
      path,
    },
  });

  return getSession().create(`idgenerators/${idGeneratorCsid}/ids`)
    .then((response) => {
      dispatch({
        type: CREATE_ID_FULFILLED,
        payload: response,
        meta: {
          recordTypeConfig,
          idGeneratorName,
          csid,
          path,
        },
      });

      return dispatch(computeRecordData(recordTypeConfig, csid))
        .then(() => dispatch(validateRecordData(recordTypeConfig, csid)));
    })
    .catch((error) => dispatch({
      type: CREATE_ID_REJECTED,
      payload: error,
      meta: {
        recordTypeConfig,
        idGeneratorName,
        csid,
        path,
      },
    }));
};
