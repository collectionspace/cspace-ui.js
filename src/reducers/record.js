import { combineReducers } from 'redux';
import Immutable from 'immutable';
import {
  createRecordData,
  deepGet,
  deepSet,
} from '../helpers/recordDataHelpers';

import {
  ADD_FIELD_INSTANCE,
  CREATE_NEW_RECORD,
  DELETE_FIELD_VALUE,
  SET_FIELD_VALUE,
  RECORD_READ_STARTED,
  RECORD_READ_FULFILLED,
  RECORD_READ_REJECTED,
  RECORD_SAVE_STARTED,
  RECORD_SAVE_FULFILLED,
  RECORD_SAVE_REJECTED,
} from '../actions';

function addFieldInstance(state, action) {
  const {
    csid,
    path,
  } = action.meta;

  const data = state[csid];

  if (!data) {
    return state;
  }

  const value = deepGet(data, path);
  const list = Immutable.List.isList(value) ? value : Immutable.List.of(value);

  const updatedData = deepSet(data, path, list.push(undefined));

  return Object.assign({}, state, {
    [csid]: updatedData,
  });
}

function createNewRecord(state, action) {
  const {
    serviceConfig,
  } = action.meta;

  // TODO: Implement cloning an existing record.

  // This code assumes that only one new record of any type may be in the process of being
  // edited at any time. The new record's data is stored alongside existing record data, at
  // key ''.

  return Object.assign({}, state, {
    '': createRecordData(serviceConfig),
  });
}

function deleteFieldValue(state, action) {
  const {
    csid,
    path,
  } = action.meta;

  const data = state[csid];

  if (!data) {
    return state;
  }

  const updatedData = data.deleteIn(path);

  return Object.assign({}, state, {
    [csid]: updatedData,
  });
}

function setFieldValue(state, action) {
  const {
    csid,
    path,
  } = action.meta;

  const data = state[csid];

  if (!data) {
    return state;
  }

  const newValue = action.payload;
  const updatedData = deepSet(data, path, newValue);

  return Object.assign({}, state, {
    [csid]: updatedData,
  });
}

function handleRecordReadFulfilled(state, action) {
  return Object.assign({}, state, {
    [action.meta.csid]: Immutable.fromJS(action.payload.data),
  });
}

function handleRecordSaveFulfilled(state, action) {
  const response = action.payload;
  const csid = action.meta.csid;

  if (response.status === 201 && response.headers.location) {
    // A new record was created. There won't be any data in the response. Copy the data in the
    // slot for the empty csid to the data slot for the new record. This prevents the form data
    // from blinking out when the browser is directed to the new csid, as it would otherwise find
    // no data until the read call to the REST API completed.

    const location = response.headers.location;
    const newRecordCsid = location.substring(location.lastIndexOf('/') + 1);

    return Object.assign({}, state, {
      [newRecordCsid]: state[''],
    });
  }

  return Object.assign({}, state, {
    [csid]: Immutable.fromJS(response.data),
  });
}

const data = (state = {}, action) => {
  switch (action.type) {
    case ADD_FIELD_INSTANCE:
      return addFieldInstance(state, action);
    case CREATE_NEW_RECORD:
      return createNewRecord(state, action);
    case DELETE_FIELD_VALUE:
      return deleteFieldValue(state, action);
    case SET_FIELD_VALUE:
      return setFieldValue(state, action);
    case RECORD_READ_FULFILLED:
      return handleRecordReadFulfilled(state, action);
    case RECORD_SAVE_FULFILLED:
      return handleRecordSaveFulfilled(state, action);
    default:
      return state;
  }
};

const savesPending = (state = {}, action) => {
  let nextState;

  switch (action.type) {
    case RECORD_SAVE_STARTED:
      return Object.assign({}, state, {
        [action.meta.csid]: true,
      });
    case RECORD_SAVE_FULFILLED:
      nextState = Object.assign({}, state);
      delete nextState[action.meta.csid];

      return nextState;
    case RECORD_SAVE_REJECTED:
      nextState = Object.assign({}, state);
      delete nextState[action.meta.csid];

      return nextState;
    default:
      return state;
  }
};

const readsPending = (state = {}, action) => {
  let nextState;

  switch (action.type) {
    case RECORD_READ_STARTED:
      return Object.assign({}, state, {
        [action.meta.csid]: true,
      });
    case RECORD_READ_FULFILLED:
      nextState = Object.assign({}, state);
      delete nextState[action.meta.csid];

      return nextState;
    case RECORD_READ_REJECTED:
      nextState = Object.assign({}, state);
      delete nextState[action.meta.csid];

      return nextState;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  savesPending,
  readsPending,
});

export function getData(state, csid) {
  return state.data[csid];
}

export function getNewData(state) {
  return state.data[''];
}

export function isSavePending(state, csid) {
  return state.savesPending[csid];
}

export function isReadPending(state, csid) {
  return state.readsPending[csid];
}
