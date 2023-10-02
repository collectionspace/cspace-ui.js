/* global window */

import get from 'lodash/get';
import qs from 'qs';
import { readAuthVocabs } from './authority';
import { createSession, setSession } from './cspace';
import { loadPrefs, savePrefs } from './prefs';
import { readAccountRoles } from './account';
import { getUserUsername } from '../reducers';

import {
  ERR_ACCOUNT_INACTIVE,
  ERR_ACCOUNT_INVALID,
  ERR_ACCOUNT_NOT_FOUND,
  ERR_AUTH_CODE_REQUEST_NOT_FOUND,
  ERR_NETWORK,
  ERR_WRONG_TENANT,
} from '../constants/errorCodes';

import {
  AUTH_CODE_URL_CREATED,
  AUTH_RENEW_FULFILLED,
  AUTH_RENEW_REJECTED,
  LOGIN_STARTED,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
} from '../constants/actionCodes';

const renewAuth = (config, authCode, authCodeRequestData = {}) => (dispatch) => {
  const {
    codeVerifier,
    redirectUri,
  } = authCodeRequestData;

  const session = createSession(authCode, codeVerifier, redirectUri);
  const loginPromise = authCode ? session.login() : Promise.resolve();

  let username = null;

  return loginPromise
    .then(() => session.read('accounts/0/accountperms'))
    .then((response) => {
      if (get(response, ['data', 'ns2:account_permission', 'account', 'tenantId']) !== config.tenantId) {
        // The logged in user doesn't belong to the tenant that this UI expects.

        return session.logout()
          .finally(() => {
            const error = new Error();
            error.code = ERR_WRONG_TENANT;

            return Promise.reject(error);
          });
      }

      username = get(response, ['data', 'ns2:account_permission', 'account', 'userId']);

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
    .then(() => Promise.resolve(username))
    .catch((error) => {
      let { code } = error;

      const data = get(error, ['response', 'data']) || '';

      if (/invalid state/.test(data)) {
        code = ERR_ACCOUNT_INVALID;
      } else if (/inactive/.test(data)) {
        code = ERR_ACCOUNT_INACTIVE;
      } else if (/account not found/.test(data)) {
        code = ERR_ACCOUNT_NOT_FOUND;
      } else {
        const desc = get(error, ['response', 'data', 'error_description']) || get(error, 'message');

        if (desc === 'Network Error') {
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

const generateS256Hash = async (input) => {
  const inputBytes = new TextEncoder().encode(input);
  const sha256Bytes = await window.crypto.subtle.digest('SHA-256', inputBytes);
  const base64 = window.btoa(String.fromCharCode(...new Uint8Array(sha256Bytes)));

  const urlSafeBase64 = base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

  return urlSafeBase64;
};

const authCodeRequestRedirectUrl = (serverUrl) => {
  const currentUrl = window.location.href;
  const authorizedUrl = new URL('authorized', currentUrl);

  if (!serverUrl) {
    return `/..${authorizedUrl.pathname}`;
  }

  return authorizedUrl.toString();
};

const authCodeRequestStorageKey = (requestId) => `authCodeRequest:${requestId}`;

export const createAuthCodeUrl = (config, landingPath) => async (dispatch) => {
  const {
    serverUrl,
  } = config;

  const requestId = window.crypto.randomUUID();
  const codeVerifier = window.crypto.randomUUID();
  const codeChallenge = await generateS256Hash(codeVerifier);
  const redirectUri = authCodeRequestRedirectUrl(serverUrl);

  const requestData = {
    codeVerifier,
    landingPath,
    redirectUri,
  };

  window.sessionStorage.setItem(authCodeRequestStorageKey(requestId), JSON.stringify(requestData));

  const params = {
    response_type: 'code',
    client_id: 'cspace-ui',
    scope: 'cspace.full',
    redirect_uri: redirectUri,
    state: requestId,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    tid: config.tenantId,
  };

  const queryString = qs.stringify(params);
  const url = `${serverUrl}/cspace-services/oauth2/authorize?${queryString}`;

  dispatch({
    type: AUTH_CODE_URL_CREATED,
    payload: url,
  });

  return url;
};

/**
 * Log in, using either the saved user or an authorization code.
 *
 * @param {*} config
 * @param {*} authCode    The authorization code. If undefined, the stored user will be used.
 * @param {*} requestData The data that was used to retrieve the authorization code.
 * @returns
 */
export const login = (config, authCode, authCodeRequestData = {}) => (dispatch, getState) => {
  const prevUsername = getUserUsername(getState());

  dispatch(savePrefs());

  dispatch({
    type: LOGIN_STARTED,
  });

  let username;

  return dispatch(renewAuth(config, authCode, authCodeRequestData))
    .then((loggedInUsername) => {
      username = loggedInUsername;

      return Promise.resolve();
    })
    .then(() => dispatch(loadPrefs(config, username)))
    .then(() => dispatch(readAuthVocabs(config)))
    .then(() => dispatch({
      type: LOGIN_FULFILLED,
      meta: {
        landingPath: authCodeRequestData.landingPath,
        prevUsername,
        username,
      },
    }))
    .catch((error) => dispatch({
      type: LOGIN_REJECTED,
      payload: error,
    }));
};

/**
 * Receive an authorization code from the OAuth server. This will have been sent in a redirect from
 * the server, in response to an authorization code request.
 *
 * @param {*} config
 * @param {*} authCodeRequestId
 * @param {*} authCode
 * @returns
 */
export const receiveAuthCode = (
  config,
  authCodeRequestId,
  authCode,
) => async (dispatch) => {
  const storageKey = authCodeRequestStorageKey(authCodeRequestId);
  const authCodeRequestDataJson = window.sessionStorage.getItem(storageKey);

  window.sessionStorage.removeItem(storageKey);

  if (!authCodeRequestDataJson) {
    const error = new Error();
    error.code = ERR_AUTH_CODE_REQUEST_NOT_FOUND;

    return dispatch({
      type: LOGIN_REJECTED,
      payload: error,
    });
  }

  const authCodeRequestData = JSON.parse(authCodeRequestDataJson);

  return dispatch(login(config, authCode, authCodeRequestData));
};
