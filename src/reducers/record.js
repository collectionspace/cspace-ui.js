import Immutable from 'immutable';
import get from 'lodash/get';

import {
  applyDefaults,
  cloneRecordData,
  createRecordData,
  deepGet,
  deepSet,
  deepDelete,
  getUpdatedTimestamp,
} from '../helpers/recordDataHelpers';

import {
  dataPathToFieldDescriptorPath,
} from '../helpers/configHelpers';

import {
  ADD_FIELD_INSTANCE,
  CREATE_NEW_RECORD,
  DELETE_FIELD_VALUE,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  RECORD_READ_STARTED,
  RECORD_READ_FULFILLED,
  RECORD_READ_REJECTED,
  RECORD_SAVE_STARTED,
  RECORD_SAVE_FULFILLED,
  RECORD_SAVE_REJECTED,
  REVERT_RECORD,
  VALIDATION_FAILED,
  VALIDATION_PASSED,
} from '../actions/record';

import {
  SUBJECT_RELATIONS_UPDATED,
} from '../actions/relation';

import {
  CREATE_ID_FULFILLED,
} from '../actions/idGenerator';

const newRecordCsid = '';

const getCurrentData = (state, csid) => state.getIn([csid, 'data', 'current']);
const setCurrentData = (state, csid, data) => state.setIn([csid, 'data', 'current'], data);

const getBaselineData = (state, csid) => state.getIn([csid, 'data', 'baseline']);
const setBaselineData = (state, csid, data) => state.setIn([csid, 'data', 'baseline'], data);

const addFieldInstance = (state, action) => {
  const {
    csid,
    path,
    recordTypeConfig,
  } = action.meta;

  const data = getCurrentData(state, csid);

  if (!data) {
    return state;
  }

  const value = deepGet(data, path);
  const list = Immutable.List.isList(value) ? value : Immutable.List.of(value);

  const fieldDescriptor = get(recordTypeConfig, ['fields', ...dataPathToFieldDescriptorPath(path)]);
  const defaultData = applyDefaults(fieldDescriptor);

  const updatedData = deepSet(data, path, list.push(defaultData));

  return setCurrentData(state, csid, updatedData);
};

const createNewRecord = (state, action) => {
  const {
    recordTypeConfig,
    cloneCsid,
  } = action.meta;

  // This code assumes that only one new record of any type may be in the process of being
  // edited at any time. The new record's data is stored alongside existing record data, at
  // key ''.

  let data;

  if (cloneCsid) {
    data = cloneRecordData(recordTypeConfig, getCurrentData(state, cloneCsid));
  }

  if (!data) {
    data = createRecordData(recordTypeConfig);
  }

  let updatedState = state;

  updatedState = setBaselineData(updatedState, newRecordCsid, data);
  updatedState = setCurrentData(updatedState, newRecordCsid, data);

  return updatedState;
};

const deleteFieldValue = (state, action) => {
  const {
    csid,
    path,
  } = action.meta;

  const data = getCurrentData(state, csid);

  if (!data) {
    return state;
  }

  const updatedData = deepDelete(data, path);

  return setCurrentData(state, csid, updatedData);
};

const moveFieldValue = (state, action) => {
  const {
    csid,
    path,
    newPosition,
  } = action.meta;

  const data = getCurrentData(state, csid);

  if (!data) {
    return state;
  }

  const listPath = path.slice(0, -1);
  const oldPosition = path[path.length - 1];

  let list = deepGet(data, listPath);

  if (!Immutable.List.isList(list)) {
    return state;
  }

  const value = list.get(oldPosition);

  list = list.delete(oldPosition);
  list = list.insert(newPosition, value);

  const updatedData = deepSet(data, listPath, list);

  return setCurrentData(state, csid, updatedData);
};

const setFieldValue = (state, action) => {
  const {
    csid,
    path,
  } = action.meta;

  const data = getCurrentData(state, csid);

  if (!data) {
    return state;
  }

  const newValue = action.payload;
  const updatedData = deepSet(data, path, newValue);
  const updatedState = setCurrentData(state, csid, updatedData);

  return updatedState;
};

const handleRecordReadFulfilled = (state, action) => {
  const data = Immutable.fromJS(action.payload.data);

  const {
    csid,
  } = action.meta;

  let updatedState = state.deleteIn([csid, 'isReadPending']);

  updatedState = setBaselineData(updatedState, csid, data);
  updatedState = setCurrentData(updatedState, csid, data);

  return updatedState;
};

const handleRecordSaveFulfilled = (state, action) => {
  const data = Immutable.fromJS(action.payload.data);

  const {
    csid,
    relatedSubjectCsid,
  } = action.meta;

  let updatedState = state;

  updatedState = updatedState.deleteIn([csid, 'isSavePending']);

  updatedState = setBaselineData(updatedState, csid, data);
  updatedState = setCurrentData(updatedState, csid, data);

  if (relatedSubjectCsid) {
    updatedState = updatedState.setIn(
      [relatedSubjectCsid, 'relationUpdatedTime'],
      getUpdatedTimestamp(data)
    );
  }

  // Reset new record data.

  updatedState = updatedState.delete(newRecordCsid);

  return updatedState;
};

const handleSubjectRelationsUpdated = (state, action) => {
  // Currently relations are only ever created (not updated), and we don't bother to retrieve
  // the relation record after creation. Technically we should retrieve the new relation
  // record and use its updatedAt value here, but that's an extra request. For now just use the
  // current local time, at least until there's some additional reason to retrieve the full
  // relation record.

  const subjectCsid = action.meta.csid;
  const newUpdatedTime = (new Date()).toISOString();

  if (state.has(subjectCsid)) {
    return state.setIn([subjectCsid, 'relationUpdatedTime'], newUpdatedTime);
  }

  return state;
};

const handleCreateIDFulfilled = (state, action) => {
  const {
    csid,
    path,
  } = action.meta;

  const data = getCurrentData(state, csid);

  if (!data) {
    return state;
  }

  const newValue = action.payload.data;
  const updatedData = deepSet(data, path, newValue);
  const updatedState = setCurrentData(state, csid, updatedData);

  return updatedState;
};

const handleValidationFailed = (state, action) => {
  const errors = action.payload;

  const {
    csid,
    path,
  } = action.meta;

  return state.setIn([csid, 'validation', ...path], errors);
};

const handleValidationPassed = (state, action) => {
  const {
    csid,
    path,
  } = action.meta;

  return state.deleteIn([csid, 'validation', ...path]);
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case VALIDATION_FAILED:
      return handleValidationFailed(state, action);
    case VALIDATION_PASSED:
      return handleValidationPassed(state, action);
    case ADD_FIELD_INSTANCE:
      return addFieldInstance(state, action);
    case CREATE_NEW_RECORD:
      return createNewRecord(state, action);
    case DELETE_FIELD_VALUE:
      return deleteFieldValue(state, action);
    case MOVE_FIELD_VALUE:
      return moveFieldValue(state, action);
    case SET_FIELD_VALUE:
      return setFieldValue(state, action);
    case RECORD_READ_STARTED:
      return state.setIn([action.meta.csid, 'isReadPending'], true);
    case RECORD_READ_FULFILLED:
      return handleRecordReadFulfilled(state, action);
    case RECORD_READ_REJECTED:
      return (
        state
          .setIn([action.meta.csid, 'error'], Immutable.fromJS(action.payload))
          .deleteIn([action.meta.csid, 'isReadPending'])
      );
    case RECORD_SAVE_STARTED:
      return state.setIn([action.meta.csid, 'isSavePending'], true);
    case RECORD_SAVE_FULFILLED:
      return handleRecordSaveFulfilled(state, action);
    case RECORD_SAVE_REJECTED:
      return (
        state
          .setIn([action.meta.csid, 'error'], Immutable.fromJS(action.payload))
          .deleteIn([action.meta.csid, 'isSavePending'])
      );
    case REVERT_RECORD:
      return setCurrentData(state, action.meta.csid, getBaselineData(state, action.meta.csid));
    case SUBJECT_RELATIONS_UPDATED:
      return handleSubjectRelationsUpdated(state, action);
    case CREATE_ID_FULFILLED:
      return handleCreateIDFulfilled(state, action);
    default:
      return state;
  }
};

export const getData = (state, csid) => getCurrentData(state, csid);

export const getRelationUpdatedTimestamp = (state, csid) => state.getIn([csid, 'relationUpdatedTime']);

export const getNewData = state => getData(state, newRecordCsid);

export const getValidationErrors = (state, csid) => state.getIn([csid, 'validation']);

export const isReadPending = (state, csid) => state.getIn([csid, 'isReadPending']);

export const isSavePending = (state, csid) => state.getIn([csid, 'isSavePending']);

export const isModified = (state, csid) =>
  // Do a reference equality test between the current and baseline data. This will not detect if
  // a change is made, then another change is made that undoes the first. But it's more efficient
  // than a deep value equality test.
  getCurrentData(state, csid) !== getBaselineData(state, csid);
