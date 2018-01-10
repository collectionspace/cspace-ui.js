/* global btoa */

import getSession from './cspace';

export const ACCOUNT_PERMS_READ_FULFILLED = 'ACCOUNT_PERMS_READ_FULFILLED';
export const ACCOUNT_PERMS_READ_REJECTED = 'ACCOUNT_PERMS_READ_REJECTED';

export const readAccountPerms = (config, username) => (dispatch) => {
  if (!username) {
    return Promise.resolve();
  }

  return getSession().read('accounts/0/accountperms')
    .then(response => dispatch({
      type: ACCOUNT_PERMS_READ_FULFILLED,
      payload: response,
      meta: {
        config,
      },
    }))
    .catch((error) => {
      dispatch({
        type: ACCOUNT_PERMS_READ_REJECTED,
        payload: error,
      });

      return Promise.reject(error);
    });
};

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
