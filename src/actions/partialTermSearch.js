import getSession from './cspace';

export const ADD_TERM_STARTED = 'ADD_TERM_STARTED';
export const ADD_TERM_FULFILLED = 'ADD_TERM_FULFILLED';
export const ADD_TERM_REJECTED = 'ADD_TERM_REJECTED';
export const PARTIAL_TERM_SEARCH_STARTED = 'PARTIAL_TERM_SEARCH_STARTED';
export const PARTIAL_TERM_SEARCH_FULFILLED = 'PARTIAL_TERM_SEARCH_FULFILLED';
export const PARTIAL_TERM_SEARCH_REJECTED = 'PARTIAL_TERM_SEARCH_REJECTED';
export const CLEAR_PARTIAL_TERM_SEARCH_RESULTS = 'CLEAR_PARTIAL_TERM_SEARCH_RESULTS';

export const addTerm = (serviceConfig, vocabularyName, displayName) => (dispatch) => {
  const {
    name: authorityServiceName,
  } = serviceConfig;

  dispatch({
    type: ADD_TERM_STARTED,
    meta: {
      displayName,
      authorityServiceName,
      vocabularyName,
    },
  });

  const config = {
    data: serviceConfig.quickAddData({
      displayName,
    }),
  };

  return getSession().create(`${authorityServiceName}/urn:cspace:name(${vocabularyName})/items`, config)
    .then(response => getSession().read(response.headers.location))
    .then(response => dispatch({
      type: ADD_TERM_FULFILLED,
      payload: response,
      meta: {
        displayName,
        authorityServiceName,
        vocabularyName,
      },
    }))
    .catch(error => dispatch({
      type: ADD_TERM_REJECTED,
      payload: error,
      meta: {
        displayName,
        authorityServiceName,
        vocabularyName,
      },
    }));
};

export const findMatchingTerms = (serviceConfig, vocabularyName, partialTerm) => (dispatch) => {
  const {
    name: authorityServiceName,
  } = serviceConfig;

  dispatch({
    type: PARTIAL_TERM_SEARCH_STARTED,
    meta: {
      partialTerm,
      authorityServiceName,
      vocabularyName,
    },
  });

  const config = {
    params: {
      pt: partialTerm,
      wf_deleted: 'false',
    },
  };

  return getSession().read(`${authorityServiceName}/urn:cspace:name(${vocabularyName})/items`, config)
    .then(response => dispatch({
      type: PARTIAL_TERM_SEARCH_FULFILLED,
      payload: response,
      meta: {
        partialTerm,
        authorityServiceName,
        vocabularyName,
      },
    }))
    .catch(error => dispatch({
      type: PARTIAL_TERM_SEARCH_REJECTED,
      payload: error,
      meta: {
        partialTerm,
        authorityServiceName,
        vocabularyName,
      },
    }));
};

export const clearMatchedTerms = () => ({
  type: CLEAR_PARTIAL_TERM_SEARCH_RESULTS,
});
