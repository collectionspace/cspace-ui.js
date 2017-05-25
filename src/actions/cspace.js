import cspaceClient from 'cspace-client';
import { loadPrefs } from './prefs';

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
  client = cspaceClient(config);

  dispatch(createSession());
  dispatch(loadPrefs());
};

export default () => session;
