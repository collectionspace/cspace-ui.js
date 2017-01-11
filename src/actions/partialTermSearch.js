import getSession from './cspace';

export const ADD_TERM_STARTED = 'ADD_TERM_STARTED';
export const ADD_TERM_FULFILLED = 'ADD_TERM_FULFILLED';
export const ADD_TERM_REJECTED = 'ADD_TERM_REJECTED';
export const PARTIAL_TERM_SEARCH_STARTED = 'PARTIAL_TERM_SEARCH_STARTED';
export const PARTIAL_TERM_SEARCH_FULFILLED = 'PARTIAL_TERM_SEARCH_FULFILLED';
export const PARTIAL_TERM_SEARCH_REJECTED = 'PARTIAL_TERM_SEARCH_REJECTED';
export const CLEAR_PARTIAL_TERM_SEARCH_RESULTS = 'CLEAR_PARTIAL_TERM_SEARCH_RESULTS';

export const addTerm = (authorityRecordTypeConfig, vocabularyName, displayName) => (dispatch) => {
  const {
    vocabularies,
    name: authorityName,
    serviceConfig: authorityServiceConfig,
  } = authorityRecordTypeConfig;

  const {
    servicePath: authorityServicePath,
  } = authorityServiceConfig;

  const {
    servicePath: vocabularyServicePath,
  } = vocabularies[vocabularyName].serviceConfig;

  dispatch({
    type: ADD_TERM_STARTED,
    meta: {
      displayName,
      authorityName,
      vocabularyName,
    },
  });

  const config = {
    data: authorityServiceConfig.quickAddData({
      displayName,
    }),
  };

  return getSession().create(`${authorityServicePath}/${vocabularyServicePath}/items`, config)
    .then(response => getSession().read(response.headers.location))
    .then(response => dispatch({
      type: ADD_TERM_FULFILLED,
      payload: response,
      meta: {
        displayName,
        authorityName,
        vocabularyName,
      },
    }))
    .catch(error => dispatch({
      type: ADD_TERM_REJECTED,
      payload: error,
      meta: {
        displayName,
        authorityName,
        vocabularyName,
      },
    }));
};

export const findMatchingTerms = (authorityRecordTypeConfig, vocabularyName, partialTerm) =>
  (dispatch) => {
    const {
      vocabularies,
      name: authorityName,
      serviceConfig: authorityServiceConfig,
    } = authorityRecordTypeConfig;

    const {
      servicePath: authorityServicePath,
    } = authorityServiceConfig;

    const {
      servicePath: vocabularyServicePath,
    } = vocabularies[vocabularyName].serviceConfig;

    dispatch({
      type: PARTIAL_TERM_SEARCH_STARTED,
      meta: {
        partialTerm,
        authorityName,
        vocabularyName,
      },
    });

    const config = {
      params: {
        pt: partialTerm,
        wf_deleted: 'false',
      },
    };

    return getSession().read(`${authorityServicePath}/${vocabularyServicePath}/items`, config)
      .then(response => dispatch({
        type: PARTIAL_TERM_SEARCH_FULFILLED,
        payload: response,
        meta: {
          partialTerm,
          authorityName,
          vocabularyName,
        },
      }))
      .catch(error => dispatch({
        type: PARTIAL_TERM_SEARCH_REJECTED,
        payload: error,
        meta: {
          partialTerm,
          authorityName,
          vocabularyName,
        },
      }));
  };

export const clearMatchedTerms = () => ({
  type: CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
});
