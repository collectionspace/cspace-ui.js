import get from 'lodash/get';
import getSession from './cspace';
import { getRelationFindResult } from '../reducers';

import {
  ERR_API,
} from '../constants/errorCodes';

export const CLEAR_RELATION_STATE = 'CLEAR_RELATION_STATE';
export const RELATION_FIND_STARTED = 'RELATION_FIND_STARTED';
export const RELATION_FIND_FULFILLED = 'RELATION_FIND_FULFILLED';
export const RELATION_FIND_REJECTED = 'RELATION_FIND_REJECTED';
export const RELATION_SAVE_STARTED = 'RELATION_SAVE_STARTED';
export const RELATION_SAVE_FULFILLED = 'RELATION_SAVE_FULFILLED';
export const RELATION_SAVE_REJECTED = 'RELATION_SAVE_REJECTED';

export const clearState = () => ({
  type: CLEAR_RELATION_STATE,
});

/*
 * Find a relation, given at least the subject csid and object csid, and optionally the subject
 * record type, object record type, and predicate. This function assumes that there will be very
 * few (typically zero or one) results, and retrieves them all without paginating.
 */
export const find = (config, descriptor) => (dispatch, getState) => {
  const {
    subject,
    object,
    predicate,
  } = descriptor;

  if (!subject.csid || !object.csid) {
    throw new Error('subject csid and object csid must be supplied');
  }

  if (getRelationFindResult(getState(), descriptor)) {
    // Already have a result for this descriptor. Do nothing.
    // TODO: Also check for a pending find request.

    return null;
  }

  dispatch({
    type: RELATION_FIND_STARTED,
    meta: {
      subject,
      object,
      predicate,
    },
  });

  const params = {
    prd: predicate,
    wf_deleted: 'false',
    pgSz: '0',
  };

  if (subject) {
    const {
      csid,
      recordType,
    } = subject;

    params.sbj = csid;

    if (recordType) {
      params.sbjType = get(config, ['recordTypes', recordType, 'serviceConfig', 'objectName']);
    }
  }

  if (object) {
    const {
      csid,
      recordType,
    } = object;

    params.obj = csid;

    if (recordType) {
      params.objType = get(config, ['recordTypes', recordType, 'serviceConfig', 'objectName']);
    }
  }

  const requestConfig = {
    params,
  };

  return getSession().read('/relations', requestConfig)
    .then(
      response => dispatch({
        type: RELATION_FIND_FULFILLED,
        payload: response,
        meta: {
          subject,
          object,
          predicate,
        },
      }),
      error => dispatch({
        type: RELATION_FIND_REJECTED,
        payload: {
          code: ERR_API,
          error,
        },
        meta: {
          subject,
          object,
          predicate,
        },
      })
    );
};

export const create = descriptor => (dispatch) => {
  const {
    subject,
    object,
    predicate,
  } = descriptor;

  dispatch({
    type: RELATION_SAVE_STARTED,
    meta: descriptor,
  });

  const config = {
    data: {
      document: {
        '@name': 'relations',
        'ns2:relations_common': {
          '@xmlns:ns2': 'http://collectionspace.org/services/relation',
          subjectCsid: subject.csid,
          objectCsid: object.csid,
          relationshipType: predicate,
        },
      },
    },
  };

  return getSession().create('/relations', config)
    .then(response => dispatch({
      type: RELATION_SAVE_FULFILLED,
      payload: response,
      meta: descriptor,
    }))
    .catch(error => dispatch({
      type: RELATION_SAVE_REJECTED,
      payload: {
        code: ERR_API,
        error,
      },
      meta: descriptor,
    }));
};

export const createBidirectional = descriptor => (dispatch) => {
  const {
    subject,
    object,
    predicate,
  } = descriptor;

  return dispatch(create({ subject, object, predicate }))
    .then(() => dispatch(create({ subject: object, object: subject, predicate })));
};
