import cspaceClient from 'cspace-client';

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

export const configureCSpace = (config) => {
  client = cspaceClient(config);

  return createSession();
};

export default () => session;
