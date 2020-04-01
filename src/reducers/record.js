import Immutable from 'immutable';
import get from 'lodash/get';

import {
  LOGIN_FULFILLED,
  LOGOUT_FULFILLED,
  ADD_FIELD_INSTANCE,
  CLEAR_RECORD,
  CREATE_NEW_RECORD,
  CREATE_NEW_SUBRECORD,
  DELETE_FIELD_VALUE,
  DETACH_SUBRECORD,
  FIELD_COMPUTE_FULFILLED,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  RECORD_CREATED,
  RECORD_DELETE_STARTED,
  RECORD_DELETE_FULFILLED,
  RECORD_DELETE_REJECTED,
  RECORD_READ_STARTED,
  RECORD_READ_FULFILLED,
  RECORD_READ_REJECTED,
  RECORD_SAVE_STARTED,
  RECORD_SAVE_FULFILLED,
  RECORD_SAVE_REJECTED,
  RECORD_TRANSITION_STARTED,
  RECORD_TRANSITION_FULFILLED,
  RECORD_TRANSITION_REJECTED,
  REVERT_RECORD,
  SORT_FIELD_INSTANCES,
  SUBRECORD_CREATED,
  SUBRECORD_READ_FULFILLED,
  VALIDATION_FAILED,
  VALIDATION_PASSED,
  SUBJECT_RELATIONS_UPDATED,
  CREATE_ID_FULFILLED,
  READ_VOCABULARY_ITEM_REFS_STARTED,
  READ_VOCABULARY_ITEM_REFS_FULFILLED,
  READ_VOCABULARY_ITEM_REFS_REJECTED,
} from '../constants/actionCodes';

import {
  applyDefaults,
  cloneRecordData,
  createRecordData,
  deepGet,
  deepSet,
  deepDelete,
  getUpdatedTimestamp,
  initializeChildren,
  normalizeRecordData,
} from '../helpers/recordDataHelpers';

import {
  dataPathToFieldDescriptorPath,
} from '../helpers/configHelpers';

const BASE_NEW_RECORD_KEY = '';

const unsavedRecordKey = (subrecordName) => (subrecordName ? `${BASE_NEW_RECORD_KEY}/${subrecordName}` : BASE_NEW_RECORD_KEY);

const getCurrentData = (state, csid) => state.getIn([csid, 'data', 'current']);
const setCurrentData = (state, csid, data) => state.setIn([csid, 'data', 'current'], data);

const getBaselineData = (state, csid) => state.getIn([csid, 'data', 'baseline']);
const setBaselineData = (state, csid, data) => state.setIn([csid, 'data', 'baseline'], data);

const clear = (state, csid) => {
  const recordState = state.get(csid);

  if (!recordState) {
    return state;
  }

  let nextState = state;

  const subrecord = recordState.get('subrecord');

  if (subrecord) {
    nextState = subrecord.reduce(
      (reducedState, subrecordCsid) => clear(reducedState, subrecordCsid), nextState,
    );
  }

  return nextState.delete(csid);
};

const clearAll = (state) => state.clear();

const clearFiltered = (state, filter) => {
  let nextState = state;

  state.filter(filter).forEach((recordState, csid) => {
    nextState = clear(nextState, csid);
  });

  return nextState;
};

const addFieldInstance = (state, action) => {
  const {
    csid,
    path,
    position,
    recordTypeConfig,
  } = action.meta;

  const data = getCurrentData(state, csid);

  if (!data) {
    return state;
  }

  const value = deepGet(data, path);
  const list = Immutable.List.isList(value) ? value : Immutable.List.of(value);

  const fieldDescriptor = get(recordTypeConfig, ['fields', ...dataPathToFieldDescriptorPath(path)]);
  const defaultData = initializeChildren(fieldDescriptor, applyDefaults(fieldDescriptor));

  const updatedList = (typeof position === 'undefined' || position < 0 || position >= list.size)
    ? list.push(defaultData)
    : list.insert(position, defaultData);

  const updatedData = deepSet(data, path, updatedList);

  return setCurrentData(state, csid, updatedData);
};

const sortFieldInstances = (state, action) => {
  const {
    config,
    csid,
    path,
    byField,
  } = action.meta;

  const data = getCurrentData(state, csid);

  if (!data) {
    return state;
  }

  const value = deepGet(data, path);
  const list = Immutable.List.isList(value) ? value : Immutable.List.of(value);

  // TODO: Check for a custom sort comparator function in field config.
  // For now just use the default.

  const comparator = (str1, str2) => str1.localeCompare(str2, config.locale);

  const sortedList = byField
    ? list.sortBy((item) => item.get(byField), comparator)
    : list.sort(comparator);

  const updatedData = deepSet(data, path, sortedList);

  return setCurrentData(state, csid, updatedData);
};

const doCreateNew = (state, config, recordTypeConfig, computeContext, options = {}) => {
  
  const {
    cloneCsid,
    subrecordName,
    stickyFields,
  } = options;

  let data;

  if (cloneCsid) {
    data = cloneRecordData(recordTypeConfig, cloneCsid, getCurrentData(state, cloneCsid), computeContext);
  }

  if (!data) {
    data = createRecordData(recordTypeConfig);

    if (stickyFields) {
      // Merge in the user's saved sticky fields for this record type, if any.

      const fields = stickyFields.get(recordTypeConfig.name);

      if (fields) {
        data = data.mergeDeep(fields);
      }
    }
  }

  const csid = unsavedRecordKey(subrecordName);

  let nextState = state.delete(csid);

  const { subrecords } = recordTypeConfig;

  if (subrecords) {
    Object.keys(subrecords).forEach((name) => {
      const subrecordConfig = subrecords[name];
      const { csidField } = subrecordConfig;

      let cloneSubrecordCsid;

      if (csidField) {
        cloneSubrecordCsid = deepGet(data, csidField);
      }

      if (!cloneSubrecordCsid) {
        const subrecordType = subrecordConfig.recordType;
        const subrecordTypeConfig = get(config, ['recordTypes', subrecordType]);
        const subrecordCsid = state.getIn([cloneCsid, 'subrecord', name]);

        nextState = doCreateNew(
          nextState,
          config,
          subrecordTypeConfig,
          computeContext,
          {
            cloneCsid: subrecordCsid,
            subrecordName: name,
            stickyFields,
          },
        );

        cloneSubrecordCsid = `${csid}/${name}`;

        if (csidField) {
          data = deepSet(data, csidField, cloneSubrecordCsid);
        }
      }

      nextState = nextState.setIn(
        [csid, 'subrecord', name], cloneSubrecordCsid,
      );
    });
  }

  nextState = setBaselineData(nextState, csid, data);
  nextState = setCurrentData(nextState, csid, data);

  return nextState;
};

const createNewRecord = (state, action) => {
  const {
    config,
    recordTypeConfig,
    cloneCsid,
    stickyFields,
    computeContext,
  } = action.meta;

  return doCreateNew(state, config, recordTypeConfig, computeContext, {
    cloneCsid,
    stickyFields,
  });
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
  const nextState = setCurrentData(state, csid, updatedData);

  return nextState;
};

const handleFieldComputeFulfilled = (state, action) => {
  const {
    csid,
    path,
  } = action.meta;

  const data = getCurrentData(state, csid);

  if (!data) {
    return state;
  }

  if (path.length === 0) {
    // The entire record was computed.

    const computedData = action.payload;
    const updatedData = data.mergeDeep(computedData);
    const nextState = setCurrentData(state, csid, updatedData);

    return nextState;
  }

  // TODO: Handle an individual field being computed.

  return state;
};

const handleRecordReadFulfilled = (state, action) => {
  const {
    csid,
    recordTypeConfig,
  } = action.meta;

  const data = normalizeRecordData(recordTypeConfig, Immutable.fromJS(action.payload.data));

  let nextState = state
    .deleteIn([csid, 'isReadPending'])
    .deleteIn([csid, 'error']);

  nextState = setBaselineData(nextState, csid, data);
  nextState = setCurrentData(nextState, csid, data);

  return nextState;
};

const handleRecordSaveFulfilled = (state, action) => {
  const {
    csid,
    recordTypeConfig,
    relatedSubjectCsid,
    recordPagePrimaryCsid,
  } = action.meta;

  const data = normalizeRecordData(recordTypeConfig, Immutable.fromJS(action.payload.data));

  let nextState = state;

  nextState = nextState.deleteIn([csid, 'isSavePending']);

  nextState = setBaselineData(nextState, csid, data);
  nextState = setCurrentData(nextState, csid, data);

  if (relatedSubjectCsid) {
    nextState = nextState.setIn(
      [relatedSubjectCsid, 'relationUpdatedTime'],
      getUpdatedTimestamp(data),
    );
  }

  // Remove all record state besides the record that was just saved, any of its subrecords, and any
  // related record. This isn't strictly necessary, but it's a good time to expire record data,
  // since other records may have fields computed from this record via service layer handlers.

  let persistCsids = [
    csid,
    relatedSubjectCsid,
    BASE_NEW_RECORD_KEY, // Don't clear unsaved record data
  ];

  const subrecord = nextState.getIn([csid, 'subrecord']);

  if (subrecord) {
    subrecord.valueSeq().forEach((subrecordCsid) => {
      persistCsids.push(subrecordCsid);
    });
  }

  persistCsids = new Set(persistCsids.filter(
    (value) => (value !== null && typeof value !== 'undefined'),
  ));

  nextState = clearFiltered(nextState, (recordState, candidateCsid) => (
    !persistCsids.has(candidateCsid)
    && !candidateCsid.startsWith(`${BASE_NEW_RECORD_KEY}/`) // Don't clear unsaved subrecord data
    && !recordState.get('isSavePending') // Don't clear records that are being saved
    && candidateCsid !== recordPagePrimaryCsid // Don't clear the primary record data
  ));

  return nextState;
};

const revertRecord = (state, action) => {
  const {
    recordTypeConfig,
    csid,
  } = action.meta;

  const baselineData = getBaselineData(state, csid);

  let nextState = setCurrentData(state, csid, baselineData);

  // Revert subrecords.

  const subrecords = nextState.getIn([csid, 'subrecord']);

  if (subrecords) {
    subrecords.forEach((subrecordCsid) => {
      nextState = revertRecord(nextState, {
        meta: {
          csid: subrecordCsid,
        },
      });
    });
  }

  // Revert any cached subrecord csids that originated from fields in the record.

  const configuredSubrecords = get(recordTypeConfig, 'subrecords');

  if (configuredSubrecords) {
    Object.entries(configuredSubrecords).forEach((entry) => {
      const [subrecordName, subrecordConfig] = entry;

      const {
        csidField,
      } = subrecordConfig;

      if (csidField) {
        const revertedSubrecordCsid = deepGet(baselineData, csidField);

        nextState = nextState.setIn(
          [csid, 'subrecord', subrecordName], revertedSubrecordCsid,
        );

        // Revert the reattached subrecord.

        nextState = revertRecord(nextState, {
          meta: {
            csid: revertedSubrecordCsid,
          },
        });
      }
    });
  }

  return nextState;
};

const handleSubrecordCreated = (state, action) => {
  const {
    csid,
    csidField,
    subrecordName,
    subrecordCsid,
    isDefault,
  } = action.meta;

  let nextState = state.setIn([csid, 'subrecord', subrecordName], subrecordCsid);

  if (csidField) {
    const currentData = getCurrentData(state, csid);
    const baselineData = getBaselineData(state, csid);

    if (isDefault && currentData === baselineData) {
      // This subrecord was created as the default for the container. Set the csid field in both
      // the baseline and current data, so it won't be considered a modification.

      const updatedData = deepSet(baselineData, csidField, subrecordCsid);

      nextState = setBaselineData(nextState, csid, updatedData);
      nextState = setCurrentData(nextState, csid, updatedData);
    } else {
      const updatedData = deepSet(currentData, csidField, subrecordCsid);

      nextState = setCurrentData(nextState, csid, updatedData);
    }
  }

  return nextState;
};

const createNewSubrecord = (state, action) => {
  const {
    config,
    csid,
    csidField,
    subrecordName,
    subrecordTypeConfig,
    cloneCsid,
    isDefault,
    stickyFields,
    computeContext,
    form,
  } = action.meta;

  let nextState = doCreateNew(state, config, subrecordTypeConfig, computeContext, {
    cloneCsid,
    subrecordName,
    stickyFields,
  });

  const subrecordCsid = unsavedRecordKey(subrecordName);

  nextState = handleSubrecordCreated(nextState, {
    meta: {
      csid,
      csidField,
      subrecordName,
      subrecordCsid,
      isDefault,
    },
  });

  return nextState;
};

const handleSubjectRelationsUpdated = (state, action) => {
  // Currently relations are only ever created (not updated), and we don't bother to retrieve
  // the relation record after creation. Technically we should retrieve the new relation
  // record and use its updatedAt value, but that's an extra request. For now the action creator
  // sets the updated time as a meta field.

  const {
    subject,
    updatedTime,
  } = action.meta;

  const subjectCsid = subject.csid;

  if (state.has(subjectCsid)) {
    return state.setIn([subjectCsid, 'relationUpdatedTime'], updatedTime);
  }

  return state;
};

const handleCreateIDFulfilled = (state, action) => {
  const {
    csid,
    path,
    transform,
  } = action.meta;

  const data = getCurrentData(state, csid);

  if (!data) {
    return state;
  }

  const value = action.payload.data;
  const createdID = (typeof value === 'number') ? value.toString() : value;
  const id = transform ? transform(createdID) : createdID;
  const updatedData = deepSet(data, path, id);
  const nextState = setCurrentData(state, csid, updatedData);

  return nextState;
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

const handleTransitionFulfilled = (state, action) => {
  const {
    csid,
    transitionName,
    recordPagePrimaryCsid,
    recordTypeConfig,
    relatedSubjectCsid,
    updatedTimestamp,
  } = action.meta;

  let nextState = state.deleteIn([csid, 'isSavePending']);

  if (transitionName === 'delete') {
    nextState = nextState.delete(csid);

    // Take this opportunity to expire other record data. This isn't strictly necessary, but it's a
    // good time, since the deletion of a record may affect other records via service layer
    // handlers.

    nextState = clearFiltered(nextState, (recordState, candidateCsid) => (
      !recordState.get('isSavePending') // Don't clear records that are being saved
      && candidateCsid !== recordPagePrimaryCsid // Don't clear the primary record data
    ));
  } else {
    const newData = get(action, ['payload', 'data']);

    if (newData) {
      const data = normalizeRecordData(recordTypeConfig, Immutable.fromJS(newData));

      nextState = setBaselineData(nextState, csid, data);
      nextState = setCurrentData(nextState, csid, data);
    }
  }

  if (relatedSubjectCsid) {
    nextState = nextState.setIn(
      [relatedSubjectCsid, 'relationUpdatedTime'],
      updatedTimestamp,
    );
  }

  return nextState;
};

const handleDeleteFulfilled = (state, action) => {
  const {
    csid,
    relatedSubjectCsid,
    updatedTimestamp,
  } = action.meta;

  let nextState = state.delete(csid);

  if (relatedSubjectCsid) {
    nextState = nextState.setIn(
      [relatedSubjectCsid, 'relationUpdatedTime'],
      updatedTimestamp,
    );
  }

  return nextState;
};

const detachSubrecord = (state, action) => createNewSubrecord(state, action);

const handleLoginFulfilled = (state, action) => {
  const {
    prevUsername,
    username,
  } = action.meta;

  if (prevUsername !== username) {
    // The logged in user has changed. Remove all record state, because the new user may not be
    // permitted to read some records that the previous user could.

    return clearAll(state);
  }

  return state;
};

const getRefMap = (data) => {
  let items = get(data, ['ns2:abstract-common-list', 'list-item']) || [];

  if (!Array.isArray(items)) {
    items = [items];
  }

  const refMap = {};

  items.forEach(({ csid, referenced }) => {
    refMap[csid] = referenced;
  });

  return refMap;
};

const updateItemRefStates = (data, refMap) => {
  let existingItems = data && data.getIn(['document', 'ns2:abstract-common-list', 'list-item']);

  if (!existingItems) {
    return data;
  }

  if (!Immutable.List.isList(existingItems)) {
    existingItems = Immutable.List.of(existingItems);
  }

  const updatedItems = existingItems.map((item) => item.set('referenced', refMap[item.get('csid')]));

  return data.setIn(['document', 'ns2:abstract-common-list', 'list-item'], updatedItems);
};

const handleReadVocabularyItemRefsFulfilled = (state, action) => {
  const {
    csid,
  } = action.meta;

  let nextState = state.deleteIn([csid, 'isReadVocabularyItemRefsPending']);

  const refMap = getRefMap(action.payload.data);

  const baselineData = getBaselineData(state, csid);
  const currentData = getCurrentData(state, csid);

  let nextBaselineData;
  let nextCurrentData;

  if (baselineData === currentData) {
    nextBaselineData = updateItemRefStates(baselineData, refMap);
    nextCurrentData = nextBaselineData;
  } else {
    nextBaselineData = updateItemRefStates(baselineData, refMap);
    nextCurrentData = updateItemRefStates(currentData, refMap);
  }

  nextState = setBaselineData(nextState, csid, nextBaselineData);
  nextState = setCurrentData(nextState, csid, nextCurrentData);

  return nextState;
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
    case CREATE_NEW_SUBRECORD:
      return createNewSubrecord(state, action);
    case DELETE_FIELD_VALUE:
      return deleteFieldValue(state, action);
    case MOVE_FIELD_VALUE:
      return moveFieldValue(state, action);
    case SET_FIELD_VALUE:
      return setFieldValue(state, action);
    case FIELD_COMPUTE_FULFILLED:
      return handleFieldComputeFulfilled(state, action);
    case RECORD_CREATED:
      return (
        state
          .set(action.meta.newRecordCsid, state.get(action.meta.currentCsid))
          .delete(action.meta.currentCsid)
      );
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
          // I don't think there's any reason to store the save error.
          // .setIn([action.meta.csid, 'error'], Immutable.fromJS(action.payload))
          .deleteIn([action.meta.csid, 'isSavePending'])
      );
    case RECORD_TRANSITION_STARTED:
      return state.setIn([action.meta.csid, 'isSavePending'], true);
    case RECORD_TRANSITION_FULFILLED:
      return handleTransitionFulfilled(state, action);
    case RECORD_TRANSITION_REJECTED:
      return state.deleteIn([action.meta.csid, 'isSavePending']);
    case RECORD_DELETE_STARTED:
      return state.setIn([action.meta.csid, 'isSavePending'], true);
    case RECORD_DELETE_FULFILLED:
      return handleDeleteFulfilled(state, action);
    case RECORD_DELETE_REJECTED:
      return state.deleteIn([action.meta.csid, 'isSavePending']);
    case SUBRECORD_CREATED:
      return handleSubrecordCreated(state, action);
    case SUBRECORD_READ_FULFILLED:
      return state.setIn(
        [action.meta.csid, 'subrecord', action.meta.subrecordName], action.meta.subrecordCsid,
      );
    case REVERT_RECORD:
      return revertRecord(state, action);
    case SUBJECT_RELATIONS_UPDATED:
      return handleSubjectRelationsUpdated(state, action);
    case CREATE_ID_FULFILLED:
      return handleCreateIDFulfilled(state, action);
    case DETACH_SUBRECORD:
      return detachSubrecord(state, action);
    case CLEAR_RECORD:
      return clear(state, action.meta.csid);
    case LOGIN_FULFILLED:
      return handleLoginFulfilled(state, action);
    case LOGOUT_FULFILLED:
      return clearAll(state);
    case SORT_FIELD_INSTANCES:
      return sortFieldInstances(state, action);
    case READ_VOCABULARY_ITEM_REFS_STARTED:
      return state.setIn([action.meta.csid, 'isReadVocabularyItemRefsPending'], true);
    case READ_VOCABULARY_ITEM_REFS_FULFILLED:
      return handleReadVocabularyItemRefsFulfilled(state, action);
    case READ_VOCABULARY_ITEM_REFS_REJECTED:
      return state
        .setIn([action.meta.csid, 'error'], Immutable.fromJS(action.payload))
        .deleteIn([action.meta.csid, 'isReadVocabularyItemRefsPending']);
    default:
      return state;
  }
};

export const getData = (state, csid) => getCurrentData(state, csid);

export const getError = (state, csid) => state.getIn([csid, 'error']);

export const getSubrecordCsid = (state, csid, subrecordName) => state.getIn([csid, 'subrecord', subrecordName]);

let subrecordDataMemo = null;

export const getSubrecordData = (state, csid) => {
  const subrecords = state.getIn([csid, 'subrecord']);

  let subrecordData = null;

  if (subrecords) {
    subrecordData = subrecords.map((subrecordCsid) => getData(state, subrecordCsid));

    if (Immutable.is(subrecordDataMemo, subrecordData)) {
      return subrecordDataMemo;
    }
  }

  subrecordDataMemo = subrecordData;

  return subrecordData;
};

export const getRelationUpdatedTimestamp = (state, csid) => state.getIn([csid, 'relationUpdatedTime']);

export const getNewData = (state) => getData(state, unsavedRecordKey());

export const getNewSubrecordCsid = (state, subrecordName) => (
  getSubrecordCsid(state, unsavedRecordKey(), subrecordName)
);

export const getValidationErrors = (state, csid) => state.getIn([csid, 'validation']);

export const isReadPending = (state, csid) => state.getIn([csid, 'isReadPending']);

export const isSavePending = (state, csid) => state.getIn([csid, 'isSavePending']);

export const isReadVocabularyItemRefsPending = (state, csid) => state.getIn([csid, 'isReadVocabularyItemRefsPending']);

export const isModified = (state, csid) => {
  // Do a reference equality test between the current and baseline data. This will not detect if
  // a change is made, then another change is made that undoes the first. But it's more efficient
  // than a deep value equality test.

  if (getCurrentData(state, csid) !== getBaselineData(state, csid)) {
    return true;
  }

  // Check subrecords.

  const subrecords = state.getIn([csid, 'subrecord']);

  if (subrecords && subrecords.find((subrecordCsid) => isModified(state, subrecordCsid))) {
    return true;
  }

  return false;
};

export const isModifiedExceptPart = (state, csid, exceptPart) => {
  // Check subrecords.

  const subrecords = state.getIn([csid, 'subrecord']);

  if (subrecords && subrecords.find((subrecordCsid) => isModified(state, subrecordCsid))) {
    return true;
  }

  // Check parts, except for the given exception.

  const data = state.getIn([csid, 'data']);

  if (!data) {
    return false;
  }

  const baselineData = data.get('baseline');
  const currentData = data.get('current');

  if (currentData === baselineData) {
    return false;
  }

  const baselineDocument = baselineData.get('document');
  const currentDocument = currentData.get('document');

  if (currentDocument === baselineDocument) {
    return false;
  }

  const modifiedPart = currentDocument.keySeq()
    .filter((part) => (part !== exceptPart && !part.startsWith('@')))
    .find((part) => currentDocument.get(part) !== baselineDocument.get(part));

  return !!modifiedPart;
};
