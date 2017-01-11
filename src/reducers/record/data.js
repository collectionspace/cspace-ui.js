import Immutable from 'immutable';

import {
  createRecordData,
  deepGet,
  deepSet,
} from '../../helpers/recordDataHelpers';

import {
  ADD_FIELD_INSTANCE,
  CREATE_NEW_RECORD,
  DELETE_FIELD_VALUE,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  RECORD_READ_FULFILLED,
  RECORD_SAVE_FULFILLED,
} from '../../actions/record';

import {
  CREATE_ID_FULFILLED,
} from '../../actions/idGenerator';

const addFieldInstance = (state, action) => {
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
};

const createNewRecord = (state, action) => {
  const {
    recordTypeConfig,
  } = action.meta;

  // TODO: Implement cloning an existing record.

  // This code assumes that only one new record of any type may be in the process of being
  // edited at any time. The new record's data is stored alongside existing record data, at
  // key ''.

  return Object.assign({}, state, {
    '': createRecordData(recordTypeConfig),
  });
};

const deleteFieldValue = (state, action) => {
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
};

const moveFieldValue = (state, action) => {
  const {
    csid,
    path,
    newPosition,
  } = action.meta;

  const data = state[csid];

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

  return Object.assign({}, state, {
    [csid]: updatedData,
  });
};

const setFieldValue = (state, action) => {
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
};

const handleRecordReadFulfilled = (state, action) => Object.assign({}, state, {
  [action.meta.csid]: Immutable.fromJS(action.payload.data),
});

const handleRecordSaveFulfilled = (state, action) => {
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
};

const handleCreateIDFulfilled = (state, action) => {
  const {
    csid,
    path,
  } = action.meta;

  const data = state[csid];

  if (!data) {
    return state;
  }

  const newValue = action.payload.data;
  const updatedData = deepSet(data, path, newValue);

  return Object.assign({}, state, {
    [csid]: updatedData,
  });
};

export default (state = {}, action) => {
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
    case RECORD_READ_FULFILLED:
      return handleRecordReadFulfilled(state, action);
    case RECORD_SAVE_FULFILLED:
      return handleRecordSaveFulfilled(state, action);
    case CREATE_ID_FULFILLED:
      return handleCreateIDFulfilled(state, action);
    default:
      return state;
  }
};

export const get = (state, csid) => state[csid];

export const getNew = state => get(state, '');
