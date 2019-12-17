import getSession from '../helpers/session';

import {
  getVocabulary,
  isRecordReadVocabularyItemRefsPending,
} from '../reducers';

import {
  READ_VOCABULARY_ITEMS_STARTED,
  READ_VOCABULARY_ITEMS_FULFILLED,
  READ_VOCABULARY_ITEMS_REJECTED,
  READ_VOCABULARY_ITEM_REFS_STARTED,
  READ_VOCABULARY_ITEM_REFS_FULFILLED,
  READ_VOCABULARY_ITEM_REFS_REJECTED,
} from '../constants/actionCodes';

export const readVocabularyItems = (vocabularyName) => (dispatch, getState) => {
  const vocabulary = getVocabulary(getState(), vocabularyName);

  if (vocabulary && (vocabulary.isReadPending || vocabulary.items)) {
    return Promise.resolve();
  }

  dispatch({
    type: READ_VOCABULARY_ITEMS_STARTED,
    meta: {
      vocabulary: vocabularyName,
    },
  });

  const config = {
    params: {
      pgSz: '0',
      wf_deleted: false,
      sortBy: 'vocabularyitems_common:order, vocabularyitems_common:displayName',
    },
  };

  return getSession().read(`vocabularies/urn:cspace:name(${vocabularyName})/items`, config)
    .then((response) => dispatch({
      type: READ_VOCABULARY_ITEMS_FULFILLED,
      payload: response,
      meta: {
        vocabulary: vocabularyName,
      },
    }))
    .catch((error) => dispatch({
      type: READ_VOCABULARY_ITEMS_REJECTED,
      payload: error,
      meta: {
        vocabulary: vocabularyName,
      },
    }));
};

export const readVocabularyItemRefs = (csid, vocabularyName) => (dispatch, getState) => {
  if (isRecordReadVocabularyItemRefsPending(getState(), csid)) {
    return Promise.resolve();
  }

  dispatch({
    type: READ_VOCABULARY_ITEM_REFS_STARTED,
    meta: {
      csid,
      vocabulary: vocabularyName,
    },
  });

  const config = {
    params: {
      pgSz: '0',
      wf_deleted: false,
      markIfReferenced: true,
    },
  };

  return getSession().read(`vocabularies/urn:cspace:name(${vocabularyName})/items`, config)
    .then((response) => dispatch({
      type: READ_VOCABULARY_ITEM_REFS_FULFILLED,
      payload: response,
      meta: {
        csid,
        vocabulary: vocabularyName,
      },
    }))
    .catch((error) => dispatch({
      type: READ_VOCABULARY_ITEM_REFS_REJECTED,
      payload: error,
      meta: {
        csid,
        vocabulary: vocabularyName,
      },
    }));
};
