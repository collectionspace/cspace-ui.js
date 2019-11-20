import {
  CLEAR_SEARCH_TO_SELECT,
  SET_SEARCH_TO_SELECT_KEYWORD,
  SET_SEARCH_TO_SELECT_ADVANCED,
  SET_SEARCH_TO_SELECT_RECORD_TYPE,
  SET_SEARCH_TO_SELECT_VOCABULARY,
} from '../constants/actionCodes';

import {
  getSearchToSelectRecordType,
} from '../reducers';

export const clearSearchToSelect = () => ({
  type: CLEAR_SEARCH_TO_SELECT,
});

export const setSearchToSelectKeyword = value => ({
  type: SET_SEARCH_TO_SELECT_KEYWORD,
  payload: value,
});

export const setSearchToSelectAdvanced = condition => (dispatch, getState) => {
  const recordType = getSearchToSelectRecordType(getState());

  dispatch({
    type: SET_SEARCH_TO_SELECT_ADVANCED,
    payload: condition,
    meta: {
      recordType,
    },
  });
};

export const setSearchToSelectRecordType = recordType => ({
  type: SET_SEARCH_TO_SELECT_RECORD_TYPE,
  payload: recordType,
});

export const setSearchToSelectVocabulary = vocabulary => ({
  type: SET_SEARCH_TO_SELECT_VOCABULARY,
  payload: vocabulary,
});
