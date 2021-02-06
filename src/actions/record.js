/* global window */

import { defineMessages } from 'react-intl';
import get from 'lodash/get';
import merge from 'lodash/merge';
import Immutable from 'immutable';
import getSession from '../helpers/session';
import getNotificationID from '../helpers/notificationHelpers';
import getErrorDescription from '../helpers/getErrorDescription';
import { hasBlockingError } from '../helpers/validationHelpers';
import HierarchyReparentNotifier from '../components/record/HierarchyReparentNotifier';

import {
  removeNotification,
  removeValidationNotification,
  showNotification,
  showValidationNotification,
} from './notification';

import {
  search,
} from './search';

import {
  getForm,
  getRecordData,
  getRecordSubrecordCsid,
  getRecordValidationErrors,
  getRecordPagePrimaryCsid,
  getSearchResult,
  getStickyFields,
  getSubrecordData,
  getUserRoleNames,
  isRecordReadPending,
} from '../reducers';

import {
  dataPathToFieldDescriptorPath,
} from '../helpers/configHelpers';

import {
  deepGet,
  computeField,
  isExistingRecord,
  prepareForSending,
  validateField,
} from '../helpers/recordDataHelpers';

import {
  getFirstItem,
  getSubrecordSearchName,
} from '../helpers/searchHelpers';

import {
  CLEAR_RECORD,
  CREATE_NEW_RECORD,
  CREATE_NEW_SUBRECORD,
  FIELD_COMPUTE_FULFILLED,
  FIELD_COMPUTE_REJECTED,
  RECORD_CREATED,
  SUBRECORD_CREATED,
  RECORD_DELETE_STARTED,
  RECORD_DELETE_FULFILLED,
  RECORD_DELETE_REJECTED,
  RECORD_READ_STARTED,
  RECORD_READ_FULFILLED,
  RECORD_READ_REJECTED,
  SUBRECORD_READ_FULFILLED,
  RECORD_SAVE_STARTED,
  RECORD_SAVE_FULFILLED,
  RECORD_SAVE_REJECTED,
  RECORD_TRANSITION_STARTED,
  RECORD_TRANSITION_FULFILLED,
  RECORD_TRANSITION_REJECTED,
  ADD_FIELD_INSTANCE,
  SORT_FIELD_INSTANCES,
  DELETE_FIELD_VALUE,
  MOVE_FIELD_VALUE,
  SET_FIELD_VALUE,
  REVERT_RECORD,
  VALIDATION_FAILED,
  VALIDATION_PASSED,
  DETACH_SUBRECORD,
} from '../constants/actionCodes';

import {
  ERR_API,
  ERR_COMPUTE,
} from '../constants/errorCodes';

import {
  STATUS_ERROR,
  STATUS_PENDING,
  STATUS_SUCCESS,
} from '../constants/notificationStatusCodes';

import { setStickyFields } from './prefs';

const deleteMessages = defineMessages({
  deleting: {
    id: 'action.record.deleting',
    description: 'Notification message displayed when a record is being deleted.',
    defaultMessage: `{hasTitle, select,
      yes {Deleting {title}…}
      other {Deleting record…}
    }`,
  },
  errorDeleting: {
    id: 'action.record.errorDeleting',
    description: 'Notification message displayed when a record delete fails.',
    defaultMessage: `{hasTitle, select,
      yes {Error deleting {title}: {error}}
      other {Error deleting record: {error}}
    }`,
  },
  deleted: {
    id: 'action.record.deleted',
    description: 'Notification message displayed when a record is deleted successfully.',
    defaultMessage: `{hasTitle, select,
      yes {Deleted {title}}
      other {Deleted record}
    }`,
  },
});

const saveMessages = defineMessages({
  saving: {
    id: 'action.record.saving',
    description: 'Notification message displayed when a record is being saved.',
    defaultMessage: `{hasTitle, select,
      yes {Saving {title}…}
      other {Saving record…}
    }`,
  },
  errorSaving: {
    id: 'action.record.errorSaving',
    description: 'Notification message displayed when a record save fails and there is no more specific message.',
    defaultMessage: `{hasTitle, select,
      yes {Error saving {title}: {error}}
      other {Error saving record: {error}}
    }`,
  },
  saved: {
    id: 'action.record.saved',
    description: 'Notification message displayed when a record is saved successfully.',
    defaultMessage: `{hasTitle, select,
      yes {Saved {title}}
      other {Saved record}
    }`,
  },
  errorDupRoleName: {
    id: 'action.record.errorDupRoleName',
    description: 'Notification message displayed when a role save fails because of a duplicate name.',
    defaultMessage: 'Error saving {title}: A role already exists with this name. Please choose a different name.',
  },
});

const transitionMessages = {
  delete: defineMessages({
    transitioning: {
      id: 'action.record.transition.delete.transitioning',
      description: 'Notification message displayed when a delete workflow transition (soft-delete) is in progress.',
      defaultMessage: `{hasTitle, select,
        yes {Deleting {title}…}
        other {Deleting record…}
      }`,
    },
    errorTransitioning: {
      id: 'action.record.transition.delete.errorTransitioning',
      description: 'Notification message displayed when a delete workflow transition (soft-delete) fails.',
      defaultMessage: `{hasTitle, select,
        yes {Error deleting {title}: {error}}
        other {Error deleting record: {error}}
      }`,
    },
    transitioned: {
      id: 'action.record.transition.delete.transitioned',
      description: 'Notification message displayed when a delete workflow transition (soft-delete) completes successfully.',
      defaultMessage: `{hasTitle, select,
        yes {Deleted {title}}
        other {Deleted record}
      }`,
    },
  }),
  lock: defineMessages({
    transitioning: {
      id: 'action.record.transition.lock.transitioning',
      description: 'Notification message displayed when a lock workflow transition is in progress.',
      defaultMessage: `{hasTitle, select,
        yes {Locking {title}…}
        other {Locking record…}
      }`,
    },
    errorTransitioning: {
      id: 'action.record.transition.lock.errorTransitioning',
      description: 'Notification message displayed when a lock workflow transition fails.',
      defaultMessage: `{hasTitle, select,
        yes {Error locking {title}: {error}}
        other {Error locking record: {error}}
      }`,
    },
    transitioned: {
      id: 'action.record.transition.lock.transitioned',
      description: 'Notification message displayed when a lock workflow transition completes successfully.',
      defaultMessage: `{hasTitle, select,
        yes {Locked {title}}
        other {Locked record}
      }`,
    },
  }),
};

const getSaveErrorNotificationItem = (error, title) => {
  const data = get(error, ['error', 'response', 'data']);

  if (
    typeof data === 'string'
    && data.includes('unique constraint "roles_rolename_tenant_id_key"')
  ) {
    return {
      message: saveMessages.errorDupRoleName,
      values: {
        title,
      },
    };
  }

  return {
    message: saveMessages.errorSaving,
    values: {
      title,
      hasTitle: title ? 'yes' : '',
      error: getErrorDescription(error),
    },
  };
};

export const computeFieldValue = (recordTypeConfig, csid, path, value) => (dispatch, getState) => {
  const state = getState();

  const computeContext = {
    data: value,
    path: [],
    recordData: getRecordData(state, csid),
    subrecordData: getSubrecordData(state, csid),
    fieldDescriptor: get(recordTypeConfig, ['fields', ...dataPathToFieldDescriptorPath(path)]),
    recordType: recordTypeConfig.name,
    form: getForm(state, recordTypeConfig.name),
    roleNames: getUserRoleNames(state),
  };

  return computeField(computeContext, true)
    .then((computedValue) => {
      if (typeof computedValue !== 'undefined') {
        dispatch({
          type: FIELD_COMPUTE_FULFILLED,
          payload: computedValue,
          meta: {
            csid,
            path,
          },
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: FIELD_COMPUTE_REJECTED,
        payload: {
          code: ERR_COMPUTE,
          error,
        },
        meta: {
          csid,
          path,
        },
      });

      // TODO: Show an error notification?
    });
};

export const computeRecordData = (recordTypeConfig, csid) => (dispatch, getState) => {
  const recordData = getRecordData(getState(), csid);

  return dispatch(computeFieldValue(recordTypeConfig, csid, [], recordData));
};

export const validateFieldValue = (recordTypeConfig, csid, path, value) => (dispatch, getState) => {
  const state = getState();

  const validationContext = {
    csid,
    data: value,
    path: [],
    recordData: getRecordData(state, csid),
    subrecordData: getSubrecordData(state, csid),
    fieldDescriptor: get(recordTypeConfig, ['fields', ...dataPathToFieldDescriptorPath(path)]),
    recordType: recordTypeConfig.name,
    form: getForm(state, recordTypeConfig.name),
    roleNames: getUserRoleNames(state),
  };

  return validateField(validationContext, true)
    .then((errors) => {
      if (errors) {
        dispatch({
          type: VALIDATION_FAILED,
          payload: errors,
          meta: {
            csid,
            path,
          },
        });

        dispatch(showValidationNotification(recordTypeConfig.name, csid));
      } else {
        dispatch({
          type: VALIDATION_PASSED,
          meta: {
            csid,
            path,
          },
        });

        dispatch(removeValidationNotification());
      }
    });
};

export const validateRecordData = (recordTypeConfig, csid) => (dispatch, getState) => {
  const recordData = getRecordData(getState(), csid);

  return dispatch(validateFieldValue(recordTypeConfig, csid, [], recordData));
};

const initializeSubrecords = (config, recordTypeConfig, vocabularyConfig, csid) => (
  (dispatch, getState) => {
    const { subrecords } = recordTypeConfig;

    if (!subrecords) {
      return Promise.resolve();
    }

    const data = getRecordData(getState(), csid);

    return Promise.all(Object.entries(subrecords).map((entry) => {
      const [subrecordName, subrecordConfig] = entry;

      const {
        csidField,
        subresource,
        recordType: subrecordType,
        vocabulary: subrecordVocabulary,
      } = subrecordConfig;

      let subrecordCsidPromise = null;

      if (csidField) {
        subrecordCsidPromise = Promise.resolve(deepGet(data, csidField));
      } else if (subresource) {
        const searchDescriptor = Immutable.fromJS({
          csid,
          subresource,
          recordType: recordTypeConfig.name,
          vocabulary: vocabularyConfig.name,
          searchQuery: {
            // Set page size to 1, and page to 0. This assumes we'll only ever care about the first
            // result.
            p: 0,
            size: 1,
          },
        });

        const searchName = getSubrecordSearchName(csid, subrecordName);

        const listType = subresource
          ? get(config, ['subresources', subresource, 'listType'])
          : null;

        subrecordCsidPromise = dispatch(search(config, searchName, searchDescriptor, listType))
          .then(() => {
            const result = getSearchResult(getState(), searchName, searchDescriptor);

            let subrecordCsid;

            if (result) {
              // Read the csid of the first item.

              const firstItem = getFirstItem(config, result, listType);

              if (firstItem) {
                subrecordCsid = firstItem.get('csid');
              }
            }

            return subrecordCsid;
          });
      }

      if (subrecordCsidPromise) {
        return subrecordCsidPromise.then((subrecordCsid) => {
          const subrecordTypeConfig = get(config, ['recordTypes', subrecordType]);

          const subrecordVocabularyConfig = get(
            subrecordTypeConfig, ['vocabularies', subrecordVocabulary],
          );

          if (subrecordCsid) {
            return (
            // eslint-disable-next-line no-use-before-define
              dispatch(readRecord(
                config, subrecordTypeConfig, subrecordVocabularyConfig, subrecordCsid,
              ))
                .then(() => dispatch({
                  type: SUBRECORD_READ_FULFILLED,
                  meta: {
                    csid,
                    subrecordCsid,
                    subrecordName,
                  },
                }))
            );
          }

          // No existing subrecord. Create one as a default.

          // eslint-disable-next-line no-use-before-define
          return dispatch(createNewSubrecord(
            config, csid, csidField, subrecordName,
            subrecordTypeConfig, subrecordVocabularyConfig, undefined, true,
          ));
        });
      }

      return Promise.resolve();
    }));
  }
);

const doRead = (recordTypeConfig, vocabularyConfig, csid) => {
  const {
    serviceType,
    servicePath: recordServicePath,
  } = recordTypeConfig.serviceConfig;

  const vocabularyServicePath = vocabularyConfig
    ? vocabularyConfig.serviceConfig.servicePath
    : null;

  const pathParts = [recordServicePath];

  if (vocabularyServicePath) {
    pathParts.push(vocabularyServicePath);
    pathParts.push('items');
  }

  pathParts.push(csid);

  const path = pathParts.join('/');

  const requestConfig = {
    params: {
      wf_deleted: false,
    },
  };

  if (serviceType === 'authority' || serviceType === 'object') {
    requestConfig.params.showRelations = true;
    requestConfig.params.pgSz = 0;
  }

  if (recordTypeConfig.requestConfig) {
    merge(requestConfig, recordTypeConfig.requestConfig('read'));
  }

  return getSession().read(path, requestConfig);
};

export const readRecord = (config, recordTypeConfig, vocabularyConfig, csid) => (
  (dispatch, getState) => {
    const existingData = getRecordData(getState(), csid);

    if (existingData) {
      return Promise.resolve(existingData);
    }

    if (isRecordReadPending(getState(), csid)) {
      return Promise.resolve();
    }

    dispatch({
      type: RECORD_READ_STARTED,
      meta: {
        recordTypeConfig,
        csid,
      },
    });

    return doRead(recordTypeConfig, vocabularyConfig, csid)
      .then((response) => dispatch({
        type: RECORD_READ_FULFILLED,
        payload: response,
        meta: {
          config,
          recordTypeConfig,
          csid,
        },
      }))
      .then(() => dispatch(initializeSubrecords(config, recordTypeConfig, vocabularyConfig, csid)))
      .then(() => getRecordData(getState(), csid))
      .catch((error) => dispatch({
        type: RECORD_READ_REJECTED,
        payload: {
          code: ERR_API,
          error,
        },
        meta: {
          recordTypeConfig,
          csid,
        },
      }));
  }
);

export const createNewRecord = (config, recordTypeConfig, vocabularyConfig, cloneCsid) => (
  (dispatch, getState) => {
    let readClone;

    if (cloneCsid) {
      const data = getRecordData(getState(), cloneCsid);

      if (!data) {
        // We don't have data for the record to be cloned. Read it first.

        readClone = dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, cloneCsid));
      }
    }

    if (!readClone) {
      // There's nothing to clone, or we already have the record data to be cloned. Perform an
      // async noop, so this function will be consistently async.

      readClone = new Promise((resolve) => {
        window.setTimeout(() => {
          resolve();
        }, 0);
      });
    }

    return (
      readClone.then(() => dispatch({
        type: CREATE_NEW_RECORD,
        meta: {
          config,
          recordTypeConfig,
          cloneCsid,
          stickyFields: getStickyFields(getState()),
        },
      }))
    );
  }
);

export const createNewSubrecord = (
  config, csid, csidField, subrecordName,
  subrecordTypeConfig, subrecordVocabularyConfig, cloneCsid, isDefault,
) => (dispatch, getState) => {
  let readClone;

  if (cloneCsid) {
    const data = getRecordData(getState(), cloneCsid);

    if (!data) {
      // We don't have data for the record to be cloned. Read it first.

      readClone = dispatch(readRecord(
        config, subrecordTypeConfig, subrecordVocabularyConfig, cloneCsid,
      ));
    }
  }

  if (!readClone) {
    // There's nothing to clone, or we already have the record data to be cloned. Perform an
    // async noop, so this function will be consistently async.

    readClone = new Promise((resolve) => {
      window.setTimeout(() => {
        resolve();
      }, 0);
    });
  }

  return (
    readClone.then(() => dispatch({
      type: CREATE_NEW_SUBRECORD,
      meta: {
        config,
        csid,
        csidField,
        subrecordName,
        subrecordTypeConfig,
        cloneCsid,
        isDefault,
        stickyFields: getStickyFields(getState()),
      },
    }))
  );
};

const saveSubrecords = (config, recordTypeConfig, vocabularyConfig, csid, saveStage) => (
  (dispatch, getState) => {
    const { subrecords } = recordTypeConfig;

    if (!subrecords) {
      return Promise.resolve();
    }

    return Promise.all(
      Object.entries(subrecords)
        .filter((entry) => entry[1].saveStage === saveStage)
        .map((entry) => {
          const [subrecordName, subrecordConfig] = entry;
          const subrecordCsid = getRecordSubrecordCsid(getState(), csid, subrecordName);

          if (subrecordCsid) {
            const {
              csidField,
              saveCondition,
              subresource,
            } = subrecordConfig;

            if (saveCondition) {
              const subrecordData = getRecordData(getState(), subrecordCsid);

              if (!saveCondition(subrecordData)) {
                return Promise.resolve();
              }
            }

            if (csidField) {
              const subrecordTypeConfig = get(config, ['recordTypes', subrecordConfig.recordType]);

              const subrecordVocabularyConfig = get(
                subrecordTypeConfig, ['vocabularies', subrecordConfig.vocabulary],
              );

              // eslint-disable-next-line no-use-before-define
              return dispatch(saveRecord(
                config,
                subrecordTypeConfig,
                subrecordVocabularyConfig,
                subrecordCsid,
                undefined,
                undefined,
                undefined,
                (newRecordCsid) => {
                  dispatch({
                    type: SUBRECORD_CREATED,
                    meta: {
                      csid,
                      csidField,
                      subrecordName,
                      subrecordCsid: newRecordCsid,
                    },
                  });
                },
                false,
              ));
            }

            if (subresource) {
              const searchName = getSubrecordSearchName(csid, subrecordName);
              const subrecordSubresourceConfig = get(config, ['subresources', subresource]);

              if (subrecordSubresourceConfig) {
                // eslint-disable-next-line no-use-before-define
                return dispatch(saveRecord(
                  config,
                  recordTypeConfig,
                  vocabularyConfig,
                  csid,
                  subrecordSubresourceConfig,
                  subrecordCsid,
                  undefined,
                  (newRecordCsid) => {
                    dispatch({
                      type: SUBRECORD_CREATED,
                      meta: {
                        csid,
                        searchName,
                        subrecordName,
                        subrecordCsid: newRecordCsid,
                      },
                    });
                  },
                  false,
                ));
              }
            }
          }

          return Promise.resolve();
        }),
    );
  }
);

export const saveRecord = (
  config, recordTypeConfig, vocabularyConfig, csid, subresourceConfig, subresourceCsid,
  relatedSubjectCsid, onRecordCreated, showNotifications = true,
) => (dispatch, getState, intl) => {
  let currentRecordTypeConfig;
  let currentVocabularyConfig;
  let currentCsid;

  if (subresourceConfig) {
    currentRecordTypeConfig = get(config, ['recordTypes', subresourceConfig.recordType]);

    currentVocabularyConfig = get(
      currentRecordTypeConfig, ['vocabularies', subresourceConfig.vocabulary],
    );

    currentCsid = subresourceCsid;
  } else {
    currentRecordTypeConfig = recordTypeConfig;
    currentVocabularyConfig = vocabularyConfig;
    currentCsid = csid;
  }

  return dispatch(computeRecordData(currentRecordTypeConfig, currentCsid))
    .then(() => dispatch(validateRecordData(currentRecordTypeConfig, currentCsid)))
    .then(() => {
      if (hasBlockingError(getRecordValidationErrors(getState(), currentCsid))) {
        return null;
      }

      dispatch({
        type: RECORD_SAVE_STARTED,
        meta: {
          csid: currentCsid,
        },
      });

      const title = currentRecordTypeConfig.title
        ? currentRecordTypeConfig.title(
          getRecordData(getState(), currentCsid), { config, intl },
        )
        : null;

      const notificationID = getNotificationID();

      if (showNotifications) {
        dispatch(showNotification({
          items: [{
            message: saveMessages.saving,
            values: {
              title,
              hasTitle: title ? 'yes' : '',
            },
          }],
          date: new Date(),
          status: STATUS_PENDING,
        }, notificationID));
      }

      return dispatch(saveSubrecords(
        config, currentRecordTypeConfig, currentVocabularyConfig, currentCsid, 'before',
      ))
        .then(() => dispatch(setStickyFields(currentRecordTypeConfig, currentCsid)))
        .then(() => {
          const data = getRecordData(getState(), currentCsid);
          const isExisting = isExistingRecord(data);

          const recordServicePath = get(recordTypeConfig, ['serviceConfig', 'servicePath']);
          const vocabularyServicePath = get(vocabularyConfig, ['serviceConfig', 'servicePath']);

          const pathParts = [recordServicePath];

          if (vocabularyServicePath) {
            pathParts.push(vocabularyServicePath);
            pathParts.push('items');
          }

          if (subresourceConfig) {
            if (csid) {
              pathParts.push(csid);
            }

            const subresourceServicePath = get(subresourceConfig, ['serviceConfig', 'servicePath']);

            if (subresourceServicePath) {
              pathParts.push(subresourceServicePath);
            }
          }

          if (isExisting && currentCsid) {
            pathParts.push(currentCsid);
          }

          const path = pathParts.join('/');

          const requestConfig = {
            data: prepareForSending(data, currentRecordTypeConfig).toJS(),
          };

          if (recordTypeConfig.requestConfig) {
            merge(requestConfig, recordTypeConfig.requestConfig('save', data));
          }

          if (isExisting) {
            return getSession().update(path, requestConfig)
              .then((response) => (
                currentRecordTypeConfig.refetchAfterUpdate
                  ? doRead(currentRecordTypeConfig, currentVocabularyConfig, currentCsid)
                  : response
              ))
              .then((response) => dispatch(saveSubrecords(
                config, currentRecordTypeConfig, currentVocabularyConfig, currentCsid, 'after',
              ))
                .then(() => {
                  if (showNotifications) {
                    dispatch(showNotification({
                      items: [{
                        message: saveMessages.saved,
                        values: {
                          title,
                          hasTitle: title ? 'yes' : '',
                        },
                      }],
                      date: new Date(),
                      status: STATUS_SUCCESS,
                      autoClose: true,
                    }, notificationID));
                  }

                  dispatch({
                    type: RECORD_SAVE_FULFILLED,
                    payload: response,
                    meta: {
                      relatedSubjectCsid,
                      recordTypeConfig: currentRecordTypeConfig,
                      csid: currentCsid,
                      recordPagePrimaryCsid: getRecordPagePrimaryCsid(getState()),
                    },
                  });
                })
                .then(() => dispatch(initializeSubrecords(
                  config, currentRecordTypeConfig, currentVocabularyConfig, currentCsid,
                )))
                .then(() => currentCsid)
                .catch((error) => {
                  throw error;
                }))
              .catch((error) => {
                const wrapper = new Error();
                wrapper.code = ERR_API;
                wrapper.error = error;

                return Promise.reject(wrapper);
              });
          }

          return getSession().create(path, requestConfig)
            .then((response) => {
              if (response.status === 201 && response.headers.location) {
                const { location } = response.headers;
                const newRecordCsid = location.substring(location.lastIndexOf('/') + 1);

                dispatch({
                  type: RECORD_CREATED,
                  meta: {
                    currentCsid,
                    newRecordCsid,
                    recordTypeConfig: currentRecordTypeConfig,
                  },
                });

                return dispatch(saveSubrecords(
                  config, currentRecordTypeConfig, currentVocabularyConfig, newRecordCsid, 'after',
                ))
                  .then(() => doRead(
                    currentRecordTypeConfig, currentVocabularyConfig, newRecordCsid,
                  ))
                  .then((readResponse) => {
                    if (showNotifications) {
                      dispatch(showNotification({
                        items: [{
                          message: saveMessages.saved,
                          values: {
                            title,
                            hasTitle: title ? 'yes' : '',
                          },
                        }],
                        date: new Date(),
                        status: STATUS_SUCCESS,
                        autoClose: true,
                      }, notificationID));
                    }

                    return dispatch({
                      type: RECORD_SAVE_FULFILLED,
                      payload: readResponse,
                      meta: {
                        relatedSubjectCsid,
                        recordTypeConfig: currentRecordTypeConfig,
                        csid: newRecordCsid,
                        recordPagePrimaryCsid: getRecordPagePrimaryCsid(getState()),
                      },
                    });
                  })
                  .then(() => dispatch(initializeSubrecords(
                    config, currentRecordTypeConfig, currentVocabularyConfig, newRecordCsid,
                  )))
                  .then(() => Promise.resolve(
                    onRecordCreated ? onRecordCreated(newRecordCsid) : null,
                  ))
                  .then(() => newRecordCsid);
              }

              const error = new Error('Expected response with status 201 and a location header');
              error.response = response;

              throw error;
            })
            .catch((error) => {
              const wrapper = new Error();
              wrapper.code = ERR_API;
              wrapper.error = error;

              return Promise.reject(wrapper);
            });
        })
        .catch((error) => {
          const notificationItem = getSaveErrorNotificationItem(error, title);

          if (showNotifications) {
            dispatch(showNotification({
              items: [notificationItem],
              date: new Date(),
              status: STATUS_ERROR,
            }, notificationID));
          }

          dispatch({
            type: RECORD_SAVE_REJECTED,
            payload: error,
            meta: {
              csid: currentCsid,
            },
          });

          throw error;
        });
    });
};

export const addFieldInstance = (recordTypeConfig, csid, path, position) => (dispatch) => {
  dispatch({
    type: ADD_FIELD_INSTANCE,
    meta: {
      csid,
      path,
      position,
      recordTypeConfig,
    },
  });

  return dispatch(computeRecordData(recordTypeConfig, csid))
    .then(() => dispatch(validateRecordData(recordTypeConfig, csid)));
};

export const sortFieldInstances = (config, recordTypeConfig, csid, path, byField) => (dispatch) => {
  dispatch({
    type: SORT_FIELD_INSTANCES,
    meta: {
      config,
      csid,
      path,
      byField,
      recordTypeConfig,
    },
  });

  return dispatch(computeRecordData(recordTypeConfig, csid))
    .then(() => dispatch(validateRecordData(recordTypeConfig, csid)));
};

export const deleteFieldValue = (recordTypeConfig, csid, path) => (dispatch) => {
  dispatch({
    type: DELETE_FIELD_VALUE,
    meta: {
      csid,
      path,
    },
  });

  return dispatch(computeRecordData(recordTypeConfig, csid))
    .then(() => dispatch(validateRecordData(recordTypeConfig, csid)));
};

export const moveFieldValue = (recordTypeConfig, csid, path, newPosition) => (dispatch) => {
  dispatch({
    type: MOVE_FIELD_VALUE,
    meta: {
      csid,
      path,
      newPosition,
    },
  });

  return dispatch(computeRecordData(recordTypeConfig, csid))
    .then(() => dispatch(validateRecordData(recordTypeConfig, csid)));
};

export const setFieldValue = (recordTypeConfig, csid, path, value) => (dispatch) => {
  dispatch({
    type: SET_FIELD_VALUE,
    payload: value,
    meta: {
      csid,
      path,
    },
  });

  return dispatch(computeRecordData(recordTypeConfig, csid))
    .then(() => dispatch(validateRecordData(recordTypeConfig, csid)));
};

export const revertRecord = (recordTypeConfig, csid) => (dispatch) => {
  dispatch({
    type: REVERT_RECORD,
    meta: {
      recordTypeConfig,
      csid,
    },
  });

  // Clear validation errors. Could maybe revalidate here, but to be consistent, we should also
  // validate when a record is first loaded.

  dispatch({
    type: VALIDATION_PASSED,
    meta: {
      csid,
      path: [],
    },
  });

  dispatch(removeValidationNotification());
  dispatch(removeNotification(HierarchyReparentNotifier.notificationID));
};

export const deleteRecord = (
  config, recordTypeConfig, vocabularyConfig, csid, relatedSubjectCsid,
) => (dispatch, getState, intl) => {
  const data = getRecordData(getState(), csid);
  const title = recordTypeConfig.title(data, { config, intl });
  const notificationID = getNotificationID();

  dispatch(showNotification({
    items: [{
      message: deleteMessages.deleting,
      values: {
        title,
        hasTitle: title ? 'yes' : '',
      },
    }],
    date: new Date(),
    status: STATUS_PENDING,
  }, notificationID));

  dispatch({
    type: RECORD_DELETE_STARTED,
    meta: {
      recordTypeConfig,
      csid,
    },
  });

  const recordServicePath = recordTypeConfig.serviceConfig.servicePath;

  const vocabularyServicePath = vocabularyConfig
    ? vocabularyConfig.serviceConfig.servicePath
    : null;

  const pathParts = [recordServicePath];

  if (vocabularyServicePath) {
    pathParts.push(vocabularyServicePath);
    pathParts.push('items');
  }

  if (csid) {
    pathParts.push(csid);
  }

  const path = pathParts.join('/');

  return getSession().delete(path)
    .then((response) => {
      dispatch(showNotification({
        items: [{
          message: deleteMessages.deleted,
          values: {
            title,
            hasTitle: title ? 'yes' : '',
          },
        }],
        date: new Date(),
        status: STATUS_SUCCESS,
        autoClose: true,
      }, notificationID));

      return dispatch({
        type: RECORD_DELETE_FULFILLED,
        payload: response,
        meta: {
          recordTypeConfig,
          csid,
          relatedSubjectCsid,
        },
      });
    })
    .catch((error) => {
      dispatch(showNotification({
        items: [{
          message: deleteMessages.errorDeleting,
          values: {
            title,
            hasTitle: title ? 'yes' : '',
            error: getErrorDescription(error),
          },
        }],
        date: new Date(),
        status: STATUS_ERROR,
      }, notificationID));

      return dispatch({
        type: RECORD_DELETE_REJECTED,
        payload: {
          code: ERR_API,
          error,
        },
        meta: {
          recordTypeConfig,
          csid,
        },
      });
    });
};

export const transitionRecord = (
  config, recordTypeConfig, vocabularyConfig, csid, transitionName, relatedSubjectCsid,
) => (dispatch, getState, intl) => {
  const data = getRecordData(getState(), csid);
  const title = recordTypeConfig.title(data, { config, intl });
  const notificationID = getNotificationID();

  const messages = transitionMessages[transitionName];

  if (messages) {
    dispatch(showNotification({
      items: [{
        message: messages.transitioning,
        values: {
          title,
          hasTitle: title ? 'yes' : '',
        },
      }],
      date: new Date(),
      status: STATUS_PENDING,
    }, notificationID));
  }

  dispatch({
    type: RECORD_TRANSITION_STARTED,
    meta: {
      recordTypeConfig,
      csid,
      transitionName,
    },
  });

  const recordServicePath = recordTypeConfig.serviceConfig.servicePath;

  const vocabularyServicePath = vocabularyConfig
    ? vocabularyConfig.serviceConfig.servicePath
    : null;

  const pathParts = [recordServicePath];

  if (vocabularyServicePath) {
    pathParts.push(vocabularyServicePath);
    pathParts.push('items');
  }

  if (csid) {
    pathParts.push(csid);
  }

  pathParts.push('workflow');
  pathParts.push(transitionName);

  const path = pathParts.join('/');

  return getSession().update(path)
    .then((response) => (
      (transitionName === 'delete')
        ? response
      // For all transitions other than delete, re-read the record to obtain the new workflow
      // state.
        : doRead(recordTypeConfig, vocabularyConfig, csid)
    ))
    .then((response) => {
      if (messages) {
        dispatch(showNotification({
          items: [{
            message: messages.transitioned,
            values: {
              transitionName,
              title,
              hasTitle: title ? 'yes' : '',
            },
          }],
          date: new Date(),
          status: STATUS_SUCCESS,
          autoClose: true,
        }, notificationID));
      }

      return dispatch({
        type: RECORD_TRANSITION_FULFILLED,
        payload: response,
        meta: {
          recordTypeConfig,
          csid,
          transitionName,
          relatedSubjectCsid,
          recordPagePrimaryCsid: getRecordPagePrimaryCsid(getState()),
          // We don't get data back from the transition request. Rather than making a separate
          // request to get the actual updated time of the record, just make it the current time.
          updatedTimestamp: (new Date()).toISOString(),
        },
      });
    })
    .catch((error) => {
      if (messages) {
        dispatch(showNotification({
          items: [{
            message: messages.errorTransitioning,
            values: {
              transitionName,
              title,
              hasTitle: title ? 'yes' : '',
              error: getErrorDescription(error),
            },
          }],
          date: new Date(),
          status: STATUS_ERROR,
        }, notificationID));
      }

      return dispatch({
        type: RECORD_TRANSITION_REJECTED,
        payload: {
          code: ERR_API,
          error,
        },
        meta: {
          recordTypeConfig,
          csid,
          transitionName,
        },
      });
    });
};

export const saveRecordWithTransition = (
  config, recordTypeConfig, vocabularyConfig, csid, subresourceConfig, subresourceCsid,
  relatedSubjectCsid, transitionName, onRecordCreated, showNotifications = true,
) => (dispatch) => dispatch(saveRecord(
  config, recordTypeConfig, vocabularyConfig, csid, subresourceConfig, subresourceCsid,
  relatedSubjectCsid, onRecordCreated, showNotifications,
))
  .then((savedCsid) => dispatch(transitionRecord(
    config, recordTypeConfig, vocabularyConfig, savedCsid, transitionName, relatedSubjectCsid,
  )));

export const detachSubrecord = (config, csid, csidField, subrecordName, subrecordTypeConfig) => ({
  type: DETACH_SUBRECORD,
  meta: {
    config,
    csid,
    csidField,
    subrecordName,
    subrecordTypeConfig,
  },
});

export const clearRecord = (csid) => ({
  type: CLEAR_RECORD,
  meta: {
    csid,
  },
});
