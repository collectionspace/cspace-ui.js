import cspaceClient from 'cspace-client';
import get from 'lodash/get';
import { resetLogin } from './login';
import { loadPrefs } from './prefs';
import { readAccountPerms } from './account';
import { readAuthVocabs } from './authority';
import { openModal } from './notification';
import LoginModal from '../components/login/LoginModal';

export const CSPACE_CONFIGURED = 'CSPACE_CONFIGURED';
export const READ_SYSTEM_INFO_FULFILLED = 'READ_SYSTEM_INFO_FULFILLED';
export const READ_SYSTEM_INFO_REJECTED = 'READ_SYSTEM_INFO_REJECTED';

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

export const readSystemInfo = () => dispatch =>
  getSession().read('systeminfo')
    .then(response => dispatch({
      type: READ_SYSTEM_INFO_FULFILLED,
      payload: response,
    }))
    .catch(error => dispatch({
      type: READ_SYSTEM_INFO_REJECTED,
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

  return dispatch(readAccountPerms(config, username))
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
