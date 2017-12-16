import cspaceClient from 'cspace-client';
import get from 'lodash/get';
import { loadPrefs } from './prefs';
import { readAccountPerms } from './login';

export const CSPACE_CONFIGURED = 'CSPACE_CONFIGURED';

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

export const setSession = (newSession) => {
  session = newSession;

  return {
    type: CSPACE_CONFIGURED,
    payload: session.config(),
  };
};

export const configureCSpace = config => (dispatch) => {
  client = cspaceClient({
    url: get(config, 'serverUrl'),
  });

  const newSession = createSession();

  dispatch(setSession(newSession));

  const { username } = newSession.config();

  return dispatch(readAccountPerms(config, username))
    .then(() => dispatch(loadPrefs(username)));
    // .catch(() => {
    //   // TODO: Expect a 401 here if the stored token has expired.
    // });
};

export default () => session;
