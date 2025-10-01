import Immutable from 'immutable';
import { defineMessages } from 'react-intl';
import get from 'lodash/get';
import pLimit from 'p-limit';
import getSession from '../helpers/session';
import { showNotification } from './notification';
import getErrorDescription from '../helpers/getErrorDescription';
import { getRelationFindResult } from '../reducers';

import {
  ERR_API,
} from '../constants/errorCodes';

import {
  STATUS_ERROR,
  STATUS_SUCCESS,
} from '../constants/notificationStatusCodes';

import {
  CLEAR_RELATION_STATE,
  RELATION_DELETE_STARTED,
  RELATION_DELETE_FULFILLED,
  RELATION_DELETE_REJECTED,
  RELATION_FIND_STARTED,
  RELATION_FIND_FULFILLED,
  RELATION_FIND_REJECTED,
  RELATION_SAVE_STARTED,
  RELATION_SAVE_FULFILLED,
  RELATION_SAVE_REJECTED,
  SUBJECT_RELATIONS_UPDATED,
} from '../constants/actionCodes';

export const clearState = () => ({
  type: CLEAR_RELATION_STATE,
});

const messages = defineMessages({
  related: {
    id: 'action.relation.related',
    description: 'Notification message displayed when records are related successfully.',
    defaultMessage: `{objectCount, plural,
      =0 {No records}
      one {# record}
      other {# records}
    } related to {subjectTitle}.`,
  },
  batchCreateError: {
    id: 'action.relation.batchCreateError',
    description: 'Message shown when relating multiple records fails.',
    defaultMessage: 'Some records could not be related: {error}',
  },
  batchUnrelateError: {
    id: 'action.relation.batchUnrelateError',
    description: 'Message shown when unrelating multiple records fails.',
    defaultMessage: 'Some records could not be unrelated: {error}',
  },
});

const notificationID = 'action.relation';

const relatePayload = ({ csid: subjectCsid }, { csid: objectCsid }, relationshipType) => ({
  data: {
    document: {
      'rel:relations_common': {
        '@xmlns:rel': 'http://collectionspace.org/services/relation',
        subjectCsid,
        objectCsid,
        relationshipType,
      },
    },
  },
});

// TODO: we need to find out what this number should be
export const CONCURRENCY_LIMIT = 5;

export const showRelationNotification = (message, values) => showNotification({
  items: [{
    message,
    values,
  }],
  date: new Date(),
  status: STATUS_SUCCESS,
  autoClose: true,
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
    .then((response) => dispatch({
      type: RELATION_FIND_FULFILLED,
      payload: response,
      meta: {
        subject,
        object,
        predicate,
      },
    }))
    .catch((error) => dispatch({
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

/**
 * Check if any relations exist for a given record csid and predicate, and optionally, a related
 * csid. Resolves to true or false.
 */
export const checkForRelations = (csid1, predicate, csid2) => () => {
  const params = {
    prd: predicate,
    sbj: csid1,
    andReciprocal: 'true',
    wf_deleted: 'false',
    pgSz: '1',
  };

  if (typeof csid2 !== 'undefined') {
    params.obj = csid2;
  }

  const requestConfig = {
    params,
  };

  return getSession().read('/relations', requestConfig)
    .then((response) => {
      const totalItems = get(response, ['data', 'rel:relations-common-list', 'totalItems']);

      return (totalItems && parseInt(totalItems, 10) > 0);
    });
};

export const deleteRelation = (csid) => (dispatch) => {
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
    .then((response) => dispatch({
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
    promise = dispatch(find(config, subject, object, predicate))
      .then(() => getRelationFindResult(getState(), subject, object, predicate));
  }

  return promise
    .then((findResult) => {
      const list = findResult.get('rel:relations-common-list');

      let items = list.get('relation-list-item');

      if (!Immutable.List.isList(items)) {
        items = Immutable.List.of(items);
      }

      return Promise.all(items.map((item) => dispatch(deleteRelation(item.get('csid')))));
    });
};

export const unrelate = (config, subject, object, predicate) => (dispatch) => (
  dispatch(doUnrelate(config, subject, object, predicate))
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch(() => {})
);

export const unrelateBidirectional = (config, subject, object, predicate) => (dispatch) => (
  dispatch(unrelate(config, subject, object, predicate))
    .then(() => dispatch(unrelate(config, object, subject, predicate)))
    .catch(() => {})
);

export const batchUnrelate = (config, subject, objects, predicate) => (dispatch) => (
  objects.reduce((promise, object) => promise
    .then(() => dispatch(doUnrelate(config, subject, object, predicate))), Promise.resolve())
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch((error) => {
      dispatch(showNotification({
        items: [{
          message: messages.batchUnrelateError,
          values: {
            error: getErrorDescription(error),
          },
        }],
        date: new Date(),
        status: STATUS_ERROR,
      }, notificationID));
    })
);

export const batchUnrelateBidirectional = (config, subject, objects, predicate) => (dispatch) => (
  // For the passed subject, we only want to dispatch SUBJECT_RELATIONS_UPDATED once at the end, so
  // doUnrelate is used. The passed objects should be unique; for the reverse relations (where the
  // object becomes the subject), SUBJECT_RELATIONS_UPDATED may be dispatched immediately, so
  // unrelate is used.

  // Send these requests one at a time, to avoid DOSing the server.
  objects.reduce((promise, object) => promise
    .then(() => dispatch(doUnrelate(config, subject, object, predicate)))
    .then(() => dispatch(unrelate(config, object, subject, predicate))), Promise.resolve())
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch((error) => {
      dispatch(showNotification({
        items: [{
          message: messages.batchUnrelateError,
          values: {
            error: getErrorDescription(error),
          },
        }],
        date: new Date(),
        status: STATUS_ERROR,
      }, notificationID));
    })
);

const doCreate = (subject, object, predicate) => (dispatch) => {
  dispatch({
    type: RELATION_SAVE_STARTED,
    meta: {
      subject,
      object,
      predicate,
    },
  });

  return getSession().create('/relations', relatePayload(subject, object, predicate))
    .then((response) => dispatch({
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

export const batchCreate = (subject, objects, predicate) => (dispatch) => (
  objects.reduce((promise, object) => promise
    .then(() => dispatch(checkForRelations(subject.csid, predicate, object.csid)))
    .then((relationExists) => {
      if (relationExists) {
        return Promise.resolve();
      }

      return dispatch(doCreate(subject, object, predicate));
    }), Promise.resolve())
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch((error) => {
      dispatch(showNotification({
        items: [{
          message: messages.batchCreateError,
          values: {
            error: getErrorDescription(error),
          },
        }],
        date: new Date(),
        status: STATUS_ERROR,
      }, notificationID));
    })
);

export const batchCreateBidirectional = (subjects, objects, predicate) => (dispatch) => {
  dispatch({
    type: RELATION_SAVE_STARTED,
    meta: {
      subjects,
      objects,
      predicate,
    },
  });

  const limit = pLimit(CONCURRENCY_LIMIT);

  const promises = subjects.flatMap(
    (subject) => objects.map(
      (object) => limit(() => dispatch(checkForRelations(subject.csid, predicate, object.csid))
        .then((relationExists) => {
          if (relationExists) {
            return Promise.reject(new Error('Relation already exists'));
          }
          return getSession().create('/relations', relatePayload(subject, object, predicate))
            .then(() => getSession().create('/relations', relatePayload(object, subject, predicate)));
        })),
    ),
  );

  return Promise.all(promises)
    .then(() => {
      const shorterArray = objects.length < subjects.length ? objects : subjects;
      const longerArray = objects.length >= subjects.length ? objects : subjects;

      shorterArray.forEach((item) => {
        dispatch(showRelationNotification(messages.related, {
          objectCount: longerArray.length,
          subjectTitle: item.title,
        }));

        dispatch({
          type: SUBJECT_RELATIONS_UPDATED,
          meta: {
            subject: item,
            updatedTime: (new Date()).toISOString(),
          },
        });
      });
    })
    .catch((error) => {
      dispatch({
        type: RELATION_SAVE_REJECTED,
        payload: {
          code: ERR_API,
          error,
        },
        meta: {
          subjects,
          objects,
          predicate,
        },
      });
      dispatch(showNotification({
        items: [{
          message: messages.batchCreateError,
          values: {
            error: getErrorDescription(error),
          },
        }],
        date: new Date(),
        status: STATUS_ERROR,
      }, notificationID));
    });
};

export const create = (subject, object, predicate) => (dispatch) => (
  dispatch(doCreate(subject, object, predicate))
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch(() => {})
);

export const createBidirectional = (subject, object, predicate) => (dispatch) => (
  dispatch(doCreate(subject, object, predicate))
    .then(() => dispatch(doCreate(object, subject, predicate)))
    .then(() => dispatch({
      type: SUBJECT_RELATIONS_UPDATED,
      meta: {
        subject,
        updatedTime: (new Date()).toISOString(),
      },
    }))
    .catch(() => {})
);
