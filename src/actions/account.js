/* global btoa */

import getSession from './cspace';

export const requestPasswordReset = (email, tenantId) => () => {
  const config = {
    params: {
      email,
      tid: tenantId,
    },
  };

  return getSession().create('accounts/requestpasswordreset', config);
};

export const resetPassword = (password, token) => () => {
  const config = {
    data: {
      'ns2:passwordreset': {
        '@xmlns:ns2': 'http://collectionspace.org/services/authentication',
        token,
        password: btoa(password),
      },
    },
  };

  return getSession().create('accounts/processpasswordreset', config);
};

export default {};
