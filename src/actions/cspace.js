import cspaceClient from 'cspace-client';

export const CSPACE_CONFIGURED = 'CSPACE_CONFIGURED';

let client;

export const configureCSpace = (config) => {
  client = cspaceClient(config);

  const session = client.session();

  return {
    type: CSPACE_CONFIGURED,
    payload: session.config(),
  };
};

export default () => client;
