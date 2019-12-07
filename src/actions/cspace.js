import cspaceClient from 'cspace-client';
import get from 'lodash/get';
import { resetLogin } from './login';
import { loadPrefs } from './prefs';
import { readAccountPerms, readAccountRoles } from './account';
import { readAuthVocabs } from './authority';
import { openModal } from './notification';
import LoginModal from '../components/login/LoginModal';

import {
  CSPACE_CONFIGURED,
  SYSTEM_INFO_READ_FULFILLED,
  SYSTEM_INFO_READ_REJECTED,
} from '../constants/actionCodes';

let client;
let session;

export const createSession = (username, password) => {
  if (typeof username === 'undefined' && typeof password === 'undefined') {
    return client.session();
  }

  return client.session({
    username,
    password,
  });
};

const getSession = () => session;

export const setSession = (newSession) => {
  session = newSession;

  return {
    type: CSPACE_CONFIGURED,
    payload: session.config(),
  };
};

export const readSystemInfo = config => dispatch =>
  getSession().read('systeminfo', {
    auth: false,
    params: {
      tid: get(config, 'tenantId'),
    },
  })
    .then(response => dispatch({
      type: SYSTEM_INFO_READ_FULFILLED,
      payload: response,
    }))
    .catch(error => dispatch({
      type: SYSTEM_INFO_READ_REJECTED,
      payload: error,
    }));

export const configureCSpace = config => (dispatch) => {
  client = cspaceClient({
    url: get(config, 'serverUrl'),

    onError: (error) => {
      const status = get(error, ['response', 'status']);

      if (status === 401) {
        const internalError = get(error, ['response', 'data', 'error']);

        if (internalError === 'invalid_token') {
          // The stored token is no longer valid. Show the login modal.

          dispatch(resetLogin(session.config().username));
          dispatch(openModal(LoginModal.modalName));
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

export default getSession;
