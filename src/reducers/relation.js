import Immutable from 'immutable';

import {
  CLEAR_RELATION_STATE,
  RELATION_FIND_FULFILLED,
  SUBJECT_RELATIONS_UPDATED,
} from '../constants/actionCodes';

const handleRelationFindFulfilled = (state, action) => {
  const {
    subject,
    object,
    predicate,
  } = action.meta;

  return state.setIn(
    ['find', subject.csid, object.csid, predicate, 'result'],
    Immutable.fromJS(action.payload.data)
  );
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case CLEAR_RELATION_STATE:
      return state.clear();
    case RELATION_FIND_FULFILLED:
      return handleRelationFindFulfilled(state, action);
    case SUBJECT_RELATIONS_UPDATED:
      return state.deleteIn(['find', action.meta.subject.csid]);
    default:
      return state;
  }
};

export const getFindResult = (state, subject, object, predicate) =>
  state.getIn(['find', subject.csid, object.csid, predicate, 'result']);
