import Immutable from 'immutable';
import get from 'lodash/get';
import getSession from './cspace';
import { getRelationFindResult } from '../reducers';

import {
  ERR_API,
} from '../constants/errorCodes';

export const CLEAR_RELATION_STATE = 'CLEAR_RELATION_STATE';
export const RELATION_DELETE_STARTED = 'RELATION_DELETE_STARTED';
export const RELATION_DELETE_FULFILLED = 'RELATION_DELETE_FULFILLED';
export const RELATION_DELETE_REJECTED = 'RELATION_DELETE_REJECTED';
export const RELATION_FIND_STARTED = 'RELATION_FIND_STARTED';
export const RELATION_FIND_FULFILLED = 'RELATION_FIND_FULFILLED';
export const RELATION_FIND_REJECTED = 'RELATION_FIND_REJECTED';
export const RELATION_SAVE_STARTED = 'RELATION_SAVE_STARTED';
export const RELATION_SAVE_FULFILLED = 'RELATION_SAVE_FULFILLED';
export const RELATION_SAVE_REJECTED = 'RELATION_SAVE_REJECTED';
export const SUBJECT_RELATIONS_UPDATED = 'SUBJECT_RELATIONS_UPDATED';

export const clearState = () => ({
  type: CLEAR_RELATION_STATE,
});

/*
 * Find a relation, given at least the subject csid and object csid, and optionally the subject
 * record type, object record type, and predicate. This function assumes that there will be very
 * few (typically zero or one) results, and retrieves them all without paginating.
 */
export const find = (config, subject, object, predicate) => (dispatch, getState) => {
  if (!(subject.csid || object.csid)) {
    throw new Error('subject csid or object csid must be supplied');
  }

  if (getRelationFindResult(getState(), subject, object, predicate)) {
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
    .then(response => dispatch({
      type: RELATION_FIND_FULFILLED,
      payload: response,
      meta: {
        subject,
        object,
        predicate,
      },
    }))
    .catch(error => dispatch({
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
    }));
};

export const deleteRelation = csid => (dispatch) => {
  if (!csid) {
    throw new Error('csid must be supplied');
  }

  // return Promise.resolve();
  dispatch({
    type: RELATION_DELETE_STARTED,
    meta: {
      csid,
    },
  });

  return getSession().delete(`/relations/${csid}`)
    .then(response => dispatch({
      type: RELATION_DELETE_FULFILLED,
      payload: response,
      meta: {
        csid,
      },
    }))
    .catch((error) => {
      dispatch({
        type: RELATION_DELETE_REJECTED,
        payload: {
          code: ERR_API,
          error,
        },
        meta: {
          csid,
        },
      });

      return Promise.reject(error);
    });
};

const doUnrelate = (config, subject, object, predicate) => (dispatch, getState) => {
  if (!(subject.csid && object.csid)) {
    throw new Error('subject csid and object csid must be supplied');
  }

  const existingResult = getRelationFindResult(getState(), subject, object, predicate);

  let promise;

  if (existingResult) {
    promise = Promise.resolve(existingResult);
  } else {
    promise =
      dispatch(find(config, subject, object, predicate))
        .then(() => getRelationFindResult(getState(), subject, object, predicate));
  }

  return promise
    .then((findResult) => {
      const list = findResult.get('rel:relations-common-list');

      let items = list.get('relation-list-item');

      if (!Immutable.List.isList(items)) {
        items = Immutable.List.of(items);
      }

      return Promise.all(items.map(item => dispatch(deleteRelation(item.get('csid')))));
    });
};

export const unrelate = (config, subject, object, predicate) => dispatch =>
  dispatch(doUnrelate(config, subject, object, predicate))
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch(() => {});

export const unrelateBidirectional = (config, subject, object, predicate) => dispatch =>
  dispatch(unrelate(config, subject, object, predicate))
    .then(() => dispatch(unrelate(config, object, subject, predicate)))
    .catch(() => {});

export const batchUnrelate = (config, subject, objects, predicate) => dispatch =>
  Promise.all(objects.map(object => dispatch(doUnrelate(config, subject, object, predicate))))
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch(() => {});

export const batchUnrelateBidirectional = (config, subject, objects, predicate) => dispatch =>
  // For the passed subject, we only want to dispatch SUBJECT_RELATIONS_UPDATED once at the end, so
  // doUnrelate is used. The passed objects should be unique; for the reverse relations (where the
  // object becomes the subject), SUBJECT_RELATIONS_UPDATED may be dispatched immediately, so
  // unrelate is used.

  Promise.all(
    objects.map(
      object =>
        dispatch(doUnrelate(config, subject, object, predicate))
          .then(() => dispatch(unrelate(config, object, subject, predicate)))
  ))
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch(() => {});

const doCreate = (subject, object, predicate) => (dispatch) => {
  dispatch({
    type: RELATION_SAVE_STARTED,
    meta: {
      subject,
      object,
      predicate,
    },
  });

  const config = {
    data: {
      document: {
        'rel:relations_common': {
          '@xmlns:rel': 'http://collectionspace.org/services/relation',
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
      meta: {
        subject,
        object,
        predicate,
      },
    }))
    .catch((error) => {
      dispatch({
        type: RELATION_SAVE_REJECTED,
        payload: {
          code: ERR_API,
          error,
        },
        meta: {
          subject,
          object,
          predicate,
        },
      });

      return Promise.reject(error);
    });
};

export const batchCreate = (subject, objects, predicate) => dispatch =>
  Promise.all(objects.map(object => dispatch(doCreate(subject, object, predicate))))
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch(() => {});

export const batchCreateBidirectional = (subject, objects, predicate) => dispatch =>
  Promise.all(objects.map(
    object =>
      dispatch(doCreate(subject, object, predicate))
        .then(() => dispatch(doCreate(object, subject, predicate)))
  ))
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch(() => {});

export const create = (subject, object, predicate) => dispatch =>
  dispatch(doCreate(subject, object, predicate))
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch(() => {});

export const createBidirectional = (subject, object, predicate) => dispatch =>
  dispatch(doCreate(subject, object, predicate))
    .then(() => dispatch(doCreate(object, subject, predicate)))
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch(() => {});
