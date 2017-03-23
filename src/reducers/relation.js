import Immutable from 'immutable';

import {
  CLEAR_RELATION_STATE,
  RELATION_FIND_FULFILLED,
  RELATION_SAVE_FULFILLED,
} from '../actions/relation';

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

const handleRelationSaveFulfilled = (state, action) => {
  const {
    subject,
    object,
    predicate,
  } = action.meta;

  // Seed find results to prevent an unnecessary find request.

  return state.setIn(
    ['find', subject.csid, object.csid, predicate, 'result'],
    Immutable.fromJS({
      'ns3:relations-common-list': {
        itemsInPage: '1',
        totalItems: '1',
      },
    })
  );
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case CLEAR_RELATION_STATE:
      return state.clear();
    case RELATION_FIND_FULFILLED:
      return handleRelationFindFulfilled(state, action);
    case RELATION_SAVE_FULFILLED:
      return handleRelationSaveFulfilled(state, action);
    default:
      return state;
  }
};

export const getFindResult = (state, { subject, object, predicate }) =>
  state.getIn(['find', subject.csid, object.csid, predicate, 'result']);
