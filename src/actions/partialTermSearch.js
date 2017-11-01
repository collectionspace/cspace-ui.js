import get from 'lodash/get';
import getSession from './cspace';

export const ADD_TERM_STARTED = 'ADD_TERM_STARTED';
export const ADD_TERM_FULFILLED = 'ADD_TERM_FULFILLED';
export const ADD_TERM_REJECTED = 'ADD_TERM_REJECTED';
export const PARTIAL_TERM_SEARCH_STARTED = 'PARTIAL_TERM_SEARCH_STARTED';
export const PARTIAL_TERM_SEARCH_FULFILLED = 'PARTIAL_TERM_SEARCH_FULFILLED';
export const PARTIAL_TERM_SEARCH_REJECTED = 'PARTIAL_TERM_SEARCH_REJECTED';
export const CLEAR_PARTIAL_TERM_SEARCH_RESULTS = 'CLEAR_PARTIAL_TERM_SEARCH_RESULTS';

export const addTerm = (recordTypeConfig, vocabulary, displayName) => (dispatch) => {
  const recordType = get(recordTypeConfig, 'name');
  const serviceConfig = get(recordTypeConfig, 'serviceConfig');
  const servicePath = get(serviceConfig, 'servicePath');

  const vocabularyServicePath = vocabulary
    ? get(recordTypeConfig, ['vocabularies', vocabulary, 'serviceConfig', 'servicePath'])
    : undefined;

  dispatch({
    type: ADD_TERM_STARTED,
    meta: {
      displayName,
      recordType,
      vocabulary,
    },
  });

  const config = {
    data: serviceConfig.quickAddData({
      displayName,
    }),
  };

  const itemPath = vocabularyServicePath
    ? `/${vocabularyServicePath}/items`
    : '';

  return getSession().create(`${servicePath}${itemPath}`, config)
    .then((response) => {
      const { location } = response.headers;

      // Workaround for DRYD-178
      // Should be able to just read response.headers.location, but it might contain the wrong
      // protocol, so parse out the path after cspace-services, and use that.

      const path = location.split('cspace-services/')[1];

      return getSession().read(path);
    })
    .then(response => dispatch({
      type: ADD_TERM_FULFILLED,
      payload: response,
      meta: {
        displayName,
        recordType,
        vocabulary,
      },
    }))
    .catch(error => dispatch({
      type: ADD_TERM_REJECTED,
      payload: error,
      meta: {
        displayName,
        recordType,
        vocabulary,
      },
    }));
};

export const findMatchingTerms = (recordTypeConfig, vocabulary, partialTerm) => (dispatch) => {
  const recordType = get(recordTypeConfig, 'name');
  const servicePath = get(recordTypeConfig, ['serviceConfig', 'servicePath']);

  const vocabularyServicePath = vocabulary
    ? get(recordTypeConfig, ['vocabularies', vocabulary, 'serviceConfig', 'servicePath'])
    : undefined;

  // Disable this warning, because shared vocabs are not defined in core, but are configured as
  // sources in autocompletes.
  // eslint-disable-next-line max-len
  // warning(vocabularyServicePath, `No service path found for the vocabulary ${vocabulary} in record type ${recordType}. Partial term search will not include this vocabulary.`);

  if (!vocabularyServicePath) {
    return null;
  }

  dispatch({
    type: PARTIAL_TERM_SEARCH_STARTED,
    meta: {
      partialTerm,
      recordType,
      vocabulary,
    },
  });

  const config = {
    params: {
      pt: partialTerm,
      wf_deleted: 'false',
    },
  };

  const itemPath = vocabularyServicePath
    ? `/${vocabularyServicePath}/items`
    : '';

  return getSession().read(`${servicePath}${itemPath}`, config)
    .then(response => dispatch({
      type: PARTIAL_TERM_SEARCH_FULFILLED,
      payload: response,
      meta: {
        partialTerm,
        recordType,
        vocabulary,
      },
    }))
    .catch(error => dispatch({
      type: PARTIAL_TERM_SEARCH_REJECTED,
      payload: error,
      meta: {
        partialTerm,
        recordType,
        vocabulary,
      },
    }));
};

export const clearMatchedTerms = () => ({
  type: CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
});
