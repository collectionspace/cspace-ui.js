import get from 'lodash/get';
import { readAuthVocabs } from './authority';
import { createSession, setSession } from './cspace';
import { loadPrefs, savePrefs } from './prefs';
import { readAccountRoles } from './account';
import { getUserUsername } from '../reducers';

import {
  ERR_INVALID_CREDENTIALS,
  ERR_NETWORK,
  ERR_WRONG_TENANT,
} from '../constants/errorCodes';

import {
  AUTH_RENEW_FULFILLED,
  AUTH_RENEW_REJECTED,
  RESET_LOGIN,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
} from '../constants/actionCodes';

export const resetLogin = (username) => ({
  type: RESET_LOGIN,
  meta: {
    username,
  },
});

const renewAuth = (config, username, password) => (dispatch) => {
  const session = createSession(username, password);

  return session.login()
    .then(() => session.read('accounts/0/accountperms'))
    .then((response) => {
      if (get(response, ['data', 'ns2:account_permission', 'account', 'tenantId']) !== config.tenantId) {
        // The logged in user doesn't belong to the tenant that this UI expects.

        return session.logout()
          // TODO: Use .finally when it's supported in all browsers.
          .then(() => {
            const error = new Error();
            error.code = ERR_WRONG_TENANT;

            return Promise.reject(error);
          })
          .catch(() => {
            const error = new Error();
            error.code = ERR_WRONG_TENANT;

            return Promise.reject(error);
          });
      }

      dispatch(setSession(session));

      return dispatch({
        type: AUTH_RENEW_FULFILLED,
        payload: response,
        meta: {
          config,
          username,
        },
      });
    })
    .then(() => dispatch(readAccountRoles(config, username)))
    .catch((error) => {
      let { code } = error;

      if (!code) {
        const desc = get(error, ['response', 'data', 'error_description']) || get(error, 'message');

        if (desc === 'Bad credentials') {
          code = ERR_INVALID_CREDENTIALS;
        } else if (desc === 'Network Error') {
          code = ERR_NETWORK;
        }
      }

      dispatch({
        type: AUTH_RENEW_REJECTED,
        payload: {
          code,
          error,
        },
        meta: {
          username,
        },
      });

      const wrapper = new Error();
      wrapper.code = code;
      wrapper.error = error;

      return Promise.reject(wrapper);
    });
};

export const login = (config, username, password) => (dispatch, getState) => {
  const prevUsername = getUserUsername(getState());

  dispatch(savePrefs());

  dispatch({
    type: LOGIN_STARTED,
    meta: {
      username,
    },
  });

  return dispatch(renewAuth(config, username, password))
    .then(() => dispatch(loadPrefs(config, username)))
    .then(() => dispatch(readAuthVocabs(config)))
    .then(() => dispatch({
      type: LOGIN_FULFILLED,
      meta: {
        prevUsername,
        username,
      },
    }))
    .catch((error) => dispatch({
      type: LOGIN_REJECTED,
      payload: error,
      meta: {
        username,
      },
    }));
};
