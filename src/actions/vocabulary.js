import getSession from './cspace';

export const READ_VOCABULARY_ITEMS_STARTED = 'READ_VOCABULARY_ITEMS_STARTED';
export const READ_VOCABULARY_ITEMS_FULFILLED = 'READ_VOCABULARY_ITEMS_FULFILLED';
export const READ_VOCABULARY_ITEMS_REJECTED = 'READ_VOCABULARY_ITEMS_REJECTED';

export const readVocabularyItems = vocabulary => (dispatch) => {
  dispatch({
    type: READ_VOCABULARY_ITEMS_STARTED,
    meta: {
      vocabulary,
    },
  });

  const config = {
    params: {
      pgSz: '0',
      wf_deleted: false,
    },
  };

  return getSession().read(`vocabularies/urn:cspace:name(${vocabulary})/items`, config)
    .then(response => dispatch({
      type: READ_VOCABULARY_ITEMS_FULFILLED,
      payload: response,
      meta: {
        vocabulary,
      },
    }))
    .catch(error => dispatch({
      type: READ_VOCABULARY_ITEMS_REJECTED,
      payload: error,
      meta: {
        vocabulary,
      },
    }));
};
