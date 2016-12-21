import getSession from './cspace';

export const ADD_TERM_STARTED = 'ADD_TERM_STARTED';
export const ADD_TERM_FULFILLED = 'ADD_TERM_FULFILLED';
export const ADD_TERM_REJECTED = 'ADD_TERM_REJECTED';
export const PARTIAL_TERM_SEARCH_STARTED = 'PARTIAL_TERM_SEARCH_STARTED';
export const PARTIAL_TERM_SEARCH_FULFILLED = 'PARTIAL_TERM_SEARCH_FULFILLED';
export const PARTIAL_TERM_SEARCH_REJECTED = 'PARTIAL_TERM_SEARCH_REJECTED';
export const CLEAR_PARTIAL_TERM_SEARCH_RESULTS = 'CLEAR_PARTIAL_TERM_SEARCH_RESULTS';

export const addTerm = (
  authorityName, authorityServiceConfig, vocabularyName, vocabularyServiceConfig, displayName
) => (dispatch) => {
  const {
    name: authorityServiceName,
  } = authorityServiceConfig;

  const {
    name: vocabularyServiceName,
  } = vocabularyServiceConfig;

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

  return getSession().create(`${authorityServiceName}/${vocabularyServiceName}/items`, config)
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

export const findMatchingTerms = (
  authorityName, authorityServiceConfig, vocabularyName, vocabularyServiceConfig, partialTerm
) => (dispatch) => {
  const {
    name: authorityServiceName,
  } = authorityServiceConfig;

  const {
    name: vocabularyServiceName,
  } = vocabularyServiceConfig;

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

  return getSession().read(`${authorityServiceName}/${vocabularyServiceName}/items`, config)
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
