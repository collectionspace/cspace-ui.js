import Immutable from 'immutable';
import get from 'lodash/get';
import { PROCEDURE_BY_TAG_READ_FULFILLED } from '../constants/actionCodes';

import {
  NS_PREFIX,
  DOCUMENT_PROPERTY_NAME,
} from '../constants/xmlNames';

const handleProcedureByTagFulfilled = (state, action) => {
  const response = action.payload;

  const hasDocTypes = get(response, ['data',
    DOCUMENT_PROPERTY_NAME,
    `${NS_PREFIX}:servicegroups_common`,
    'hasDocTypes',
    'hasDocType']);

  if (!hasDocTypes) {
    return state;
  }

  // currently this makes an assumption that doctypes will only have one service tag
  // it should be updated to merge state properly
  let nextState = state;
  const docTypes = Array.isArray(hasDocTypes) ? hasDocTypes : [hasDocTypes];
  docTypes.forEach((docType) => {
    nextState = nextState.setIn([docType.toLowerCase()], [action.meta.tag]);
  });

  return nextState;
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case PROCEDURE_BY_TAG_READ_FULFILLED:
      return handleProcedureByTagFulfilled(state, action);
    default:
      return state;
  }
};

export const getTags = (state, recordType) => state.getIn(['tags', recordType]);
