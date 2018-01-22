import get from 'lodash/get';
import getSession from './cspace';

export const AUTH_VOCABS_READ_STARTED = 'AUTH_VOCABS_READ_STARTED';
export const AUTH_VOCABS_READ_FULFILLED = 'AUTH_VOCABS_READ_FULFILLED';
export const AUTH_VOCABS_READ_REJECTED = 'AUTH_VOCABS_READ_REJECTED';
export const SET_AUTH_VOCAB_WORKFLOW_STATE = 'SET_AUTH_VOCAB_WORKFLOW_STATE';

export const readAuthVocabs = config => (dispatch) => {
  const recordTypes = get(config, 'recordTypes');

  if (!recordTypes) {
    // This is mostly to allow tests to run without having a config.

    return Promise.resolve();
  }

  dispatch({
    type: AUTH_VOCABS_READ_STARTED,
  });

  const session = getSession();

  const readPromises = Object.values(config.recordTypes)
    .filter(recordTypeConfig => recordTypeConfig.serviceConfig.serviceType === 'authority')
    .map(recordTypeConfig => session.read(recordTypeConfig.serviceConfig.servicePath));

  return Promise.all(readPromises)
    .then(responses => dispatch({
      type: AUTH_VOCABS_READ_FULFILLED,
      payload: responses,
      meta: {
        config,
      },
    }))
    .catch((error) => {
      dispatch({
        type: AUTH_VOCABS_READ_REJECTED,
        payload: error,
      });

      return Promise.reject(error);
    });
};
