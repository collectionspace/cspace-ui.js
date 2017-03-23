import Immutable from 'immutable';
import arrayGet from 'lodash/get';

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
} from '../actions/record';

import {
  RELATION_SAVE_FULFILLED,
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

  const fieldDescriptor = arrayGet(recordTypeConfig, ['fields', ...dataPathToFieldDescriptorPath(path)]);
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

  return setCurrentData(state, csid, updatedData);
};

const handleRecordReadFulfilled = (state, action) => {
  const data = Immutable.fromJS(action.payload.data);
  const csid = action.meta.csid;

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

  let updatedState =
    state.deleteIn([csid, 'isSavePending']).deleteIn([newRecordCsid, 'isSavePending']);

  updatedState = setBaselineData(updatedState, csid, data);
  updatedState = setCurrentData(updatedState, csid, data);

  if (relatedSubjectCsid) {
    updatedState = updatedState.setIn(
      [relatedSubjectCsid, 'relationUpdatedTime'],
      getUpdatedTimestamp(data)
    );
  }

  return updatedState;
};

const handleRelationSaveFulfilled = (state, action) => {
  // Currently relations are only ever created (not updated), and we don't bother to retrieve
  // the relation record after creation. Technically we should retrieve the new relation
  // record and use its updatedAt value here, but that's an extra request. For now just use the
  // current local time, at least until there's some additional reason to retrieve the full
  // relation record.

  const subjectCsid = action.meta.subject.csid;

  if (state.has(subjectCsid)) {
    return state.setIn([subjectCsid, 'relationUpdatedTime'], (new Date()).toISOString());
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

  return setCurrentData(state, csid, updatedData);
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
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
    case RELATION_SAVE_FULFILLED:
      return handleRelationSaveFulfilled(state, action);
    case CREATE_ID_FULFILLED:
      return handleCreateIDFulfilled(state, action);
    default:
      return state;
  }
};

export const getData = (state, csid) => getCurrentData(state, csid);

export const getRelationUpdatedTimestamp = (state, csid) => state.getIn([csid, 'relationUpdatedTime']);

export const getNewData = state => getData(state, newRecordCsid);

export const isReadPending = (state, csid) => state.getIn([csid, 'isReadPending']);

export const isSavePending = (state, csid) => state.getIn([csid, 'isSavePending']);

export const isModified = (state, csid) =>
  // Do a reference equality test between the current and baseline data. This will not detect if
  // a change is made, then another change is made that undoes the first. But it's more efficient
  // than a deep value equality test.
  getCurrentData(state, csid) !== getBaselineData(state, csid);
