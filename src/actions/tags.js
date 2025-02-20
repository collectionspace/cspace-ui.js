import { get } from 'lodash';
import getSession from '../helpers/session';

import {
  SERVICE_TAGS_READ_STARTED,
  SERVICE_TAGS_READ_FULFILLED,
  SERVICE_TAGS_READ_REJECTED,
  PROCEDURE_BY_TAG_READ_STARTED,
  PROCEDURE_BY_TAG_READ_FULFILLED,
  PROCEDURE_BY_TAG_READ_REJECTED,
} from '../constants/actionCodes';

const doRead = (tag, dispatch) => {
  dispatch({
    type: PROCEDURE_BY_TAG_READ_STARTED,
    meta: {
      tag: tag.name,
    },
  });

  const session = getSession();
  const requestConfig = {
    params: {
      servicetag: tag.name,
    },
  };

  return session.read('servicegroups/procedure', requestConfig)
    .then((response) => dispatch({
      type: PROCEDURE_BY_TAG_READ_FULFILLED,
      payload: response,
      meta: {
        tag: tag.name,
      },
    }))
    .catch((error) => {
      dispatch({
        type: PROCEDURE_BY_TAG_READ_REJECTED,
        meta: {
          tag: tag.name,
        },
      });
      return Promise.reject(error);
    });
};

const readProcedures = (response, dispatch) => {
  let tags = get(response, ['data', 'ns2:abstract-common-list', 'list-item']);
  if (!tags) {
    return Promise.resolve();
  }

  if (!Array.isArray(tags)) {
    tags = [tags];
  }

  const promises = tags.map((tag) => doRead(tag, dispatch));
  return Promise.all(promises)
    .catch((error) => Promise.reject(error));
};

export default () => (dispatch) => {
  dispatch({ type: SERVICE_TAGS_READ_STARTED });

  const session = getSession();

  return session.read('servicegroups/procedure/tags')
    .then((response) => {
      dispatch({ type: SERVICE_TAGS_READ_FULFILLED });
      return readProcedures(response, dispatch);
    })
    .catch((error) => {
      dispatch({
        type: SERVICE_TAGS_READ_REJECTED,
        payload: error,
      });

      const status = get(error, ['response', 'status']);
      return status === 403 ? undefined : Promise.reject(error);
    });
};
