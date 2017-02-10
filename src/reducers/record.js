import Immutable from 'immutable';
import arrayGet from 'lodash/get';

import {
  applyDefaults,
  createRecordData,
  deepGet,
  deepSet,
  deepDelete,
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
} from '../actions/record';

import {
  CREATE_ID_FULFILLED,
} from '../actions/idGenerator';

const newRecordCsid = '';

const getCurrentData = (state, csid) => state.getIn([csid, 'data', 'current']);
const setCurrentData = (state, csid, data) => state.setIn([csid, 'data', 'current'], data);

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
  } = action.meta;

  // TODO: Implement cloning an existing record.

  // This code assumes that only one new record of any type may be in the process of being
  // edited at any time. The new record's data is stored alongside existing record data, at
  // key ''.

  return setCurrentData(state, newRecordCsid, createRecordData(recordTypeConfig));
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

const handleRecordSaveFulfilled = (state, action) => {
  const response = action.payload;
  const csid = action.meta.csid;

  const updatedState = state.deleteIn([csid, 'isSavePending']);

  if (response.status === 201 && response.headers.location) {
    // A new record was created. There won't be any data in the response. Copy the data in the
    // slot for the new record csid to the data slot for the new record. This prevents the form
    // data from blinking out when the browser is directed to the new csid, as it would otherwise
    // find no data until the read call to the REST API completed.

    const location = response.headers.location;
    const createdRecordCsid = location.substring(location.lastIndexOf('/') + 1);

    return updatedState.set(createdRecordCsid, updatedState.get(newRecordCsid));
  }

  return setCurrentData(updatedState, csid, Immutable.fromJS(response.data));
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
      return (
        setCurrentData(state, action.meta.csid, Immutable.fromJS(action.payload.data))
          .deleteIn([action.meta.csid, 'isReadPending'])
      );
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
    case CREATE_ID_FULFILLED:
      return handleCreateIDFulfilled(state, action);
    default:
      return state;
  }
};

export const getData = (state, csid) => getCurrentData(state, csid);

export const getNewData = state => getData(state, newRecordCsid);

export const isReadPending = (state, csid) => state.getIn([csid, 'isReadPending']);

export const isSavePending = (state, csid) => state.getIn([csid, 'isSavePending']);
