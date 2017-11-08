import cspaceClient from 'cspace-client';
import get from 'lodash/get';
import { loadPrefs } from './prefs';
import { readAccountPerms } from './login';

export const CSPACE_CONFIGURED = 'CSPACE_CONFIGURED';

let client;
let session;

export const createSession = (username, password) => {
  if (typeof username === 'undefined' && typeof password === 'undefined') {
    session = client.session();
  } else {
    session = client.session({
      username,
      password,
    });
  }

  return {
    type: CSPACE_CONFIGURED,
    payload: session.config(),
  };
};

export const configureCSpace = config => (dispatch) => {
  client = cspaceClient({
    url: get(config, 'serverUrl'),
  });

  dispatch(createSession());

  return dispatch(readAccountPerms(config))
    .then(() => dispatch(loadPrefs()));
    // .catch(() => {
    //   // TODO: Expect a 401 here if the stored token has expired.
    // });
};

export default () => session;
