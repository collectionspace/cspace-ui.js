import get from 'lodash/get';
import getSession from '../helpers/session';

import {
  AUTH_VOCABS_READ_STARTED,
  AUTH_VOCABS_READ_FULFILLED,
  AUTH_VOCABS_READ_REJECTED,
} from '../constants/actionCodes';

export const readAuthVocabs = (config) => (dispatch) => {
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
    .filter((recordTypeConfig) => recordTypeConfig.serviceConfig.serviceType === 'authority')
    .map((recordTypeConfig) => session.read(recordTypeConfig.serviceConfig.servicePath)
      .catch((error) => (
        // 403 Forbidden might happen if the user doesn't have any permissions on an authority.
        // Just swallow this, but reject other errors.

        get(error, ['response', 'status']) === 403 ? undefined : Promise.reject(error)
      )));

  return Promise.all(readPromises)
    .then((responses) => dispatch({
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

/**
 * Check if any uses exist for the given authority item. Resolves to true or false.
 */
export const checkForUses = (config, recordType, vocabulary, csid) => () => {
  const recordTypeConfig = get(config, ['recordTypes', recordType]);
  const vocabularyConfig = get(recordTypeConfig, ['vocabularies', vocabulary]);

  const recordServicePath = get(recordTypeConfig, ['serviceConfig', 'servicePath']);
  const vocabularyServicePath = get(vocabularyConfig, ['serviceConfig', 'servicePath']);
  const pathParts = [recordServicePath, vocabularyServicePath, 'items', csid, 'refObjs'];
  const path = pathParts.join('/');

  const requestConfig = {
    params: {
      wf_deleted: 'false',
      pgSz: '1',
    },
  };

  return getSession().read(path, requestConfig)
    .then((response) => {
      const totalItems = get(response, ['data', 'ns3:authority-ref-doc-list', 'totalItems']);

      return (totalItems && parseInt(totalItems, 10) > 0);
    });
};
