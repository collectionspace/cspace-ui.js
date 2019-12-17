import cspaceClient from 'cspace-client';
import get from 'lodash/get';
import { MODAL_LOGIN } from '../constants/modalNames';
import getSession, { storeSession } from '../helpers/session';
import { loadPrefs } from './prefs';
import { readAccountPerms, readAccountRoles } from './account';
import { readAuthVocabs } from './authority';
import { openModal } from './notification';

import {
  CSPACE_CONFIGURED,
  RESET_LOGIN,
  SYSTEM_INFO_READ_FULFILLED,
  SYSTEM_INFO_READ_REJECTED,
} from '../constants/actionCodes';

let client;

export const createSession = (username, password) => {
  if (typeof username === 'undefined' && typeof password === 'undefined') {
    return client.session();
  }

  return client.session({
    username,
    password,
  });
};

export const setSession = (newSession) => {
  storeSession(newSession);

  return {
    type: CSPACE_CONFIGURED,
    payload: getSession().config(),
  };
};

export const readSystemInfo = (config) => (dispatch) => getSession().read('systeminfo', {
  auth: false,
  params: {
    tid: get(config, 'tenantId'),
  },
})
  .then((response) => dispatch({
    type: SYSTEM_INFO_READ_FULFILLED,
    payload: response,
  }))
  .catch((error) => dispatch({
    type: SYSTEM_INFO_READ_REJECTED,
    payload: error,
  }));

export const configureCSpace = (config) => (dispatch) => {
  client = cspaceClient({
    url: get(config, 'serverUrl'),

    onError: (error) => {
      const status = get(error, ['response', 'status']);

      if (status === 401) {
        const internalError = get(error, ['response', 'data', 'error']);

        if (internalError === 'invalid_token') {
          // The stored token is no longer valid. Show the login modal.

          dispatch({
            type: RESET_LOGIN,
            meta: {
              username: getSession().config().username,
            },
          });

          dispatch(openModal(MODAL_LOGIN));
        }
      }

      return Promise.reject(error);
    },
  });

  const newSession = createSession();

  dispatch(setSession(newSession));

  const { username } = newSession.config();

  if (!username) {
    return Promise.resolve();
  }

  return dispatch(readAccountPerms(config))
    .then(() => dispatch(readAccountRoles(config, username)))
    .then(() => dispatch(loadPrefs(config, username)))
    .then(() => dispatch(readAuthVocabs(config)))
    .catch((error) => {
      // 401 is expected if the user's auth token has expired. The client onError handler will take
      // care of showing a notification, so the error can be swallowed here.

      const status = get(error, ['response', 'status']);

      if (status === 401) {
        return Promise.resolve();
      }

      return Promise.reject(error);
    });
};
