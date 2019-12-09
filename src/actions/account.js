/* global btoa */

import get from 'lodash/get';
import getSession from './cspace';
import { getUserAccountId } from '../reducers';

import {
  ACCOUNT_PERMS_READ_FULFILLED,
  ACCOUNT_PERMS_READ_REJECTED,
  ACCOUNT_ROLES_READ_FULFILLED,
  ACCOUNT_ROLES_READ_REJECTED,
} from '../constants/actionCodes';

export const checkForRoleUses = csid => () =>
  getSession().read(`authorization/roles/${csid}/accountroles`)
    .then((response) => {
      const account = get(response, ['data', 'ns2:account_role', 'account']);

      return !!account;
    });

export const readAccountPerms = config => dispatch =>
  getSession().read('accounts/0/accountperms')
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

export const readAccountRoles = () => (dispatch, getState) => {
  const accountId = getUserAccountId(getState());

  return getSession().read(`accounts/${accountId}/accountroles`)
    .then(response => dispatch({
      type: ACCOUNT_ROLES_READ_FULFILLED,
      payload: response,
    }))
    .catch((error) => {
      dispatch({
        type: ACCOUNT_ROLES_READ_REJECTED,
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
