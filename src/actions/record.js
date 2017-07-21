/* global window */

import { defineMessages } from 'react-intl';
import get from 'lodash/get';
import getSession from './cspace';
import getNotificationID from '../helpers/notificationHelpers';
import getErrorDescription from '../helpers/getErrorDescription';

import {
  showNotification,
  showValidationNotification,
  removeValidationNotification,
} from './notification';

import {
  getRecordData,
  getRecordValidationErrors,
  isRecordReadPending,
} from '../reducers';

import {
  dataPathToFieldDescriptorPath,
} from '../helpers/configHelpers';

import {
  getDocument,
  prepareForSending,
  validateField,
} from '../helpers/recordDataHelpers';

import {
  ERR_API,
  ERR_VALIDATION,
} from '../constants/errorCodes';

import {
  STATUS_ERROR,
  STATUS_PENDING,
  STATUS_SUCCESS,
} from '../constants/notificationStatusCodes';

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
    description: 'Notification message displayed when a record save fails.',
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
};

export const CREATE_NEW_RECORD = 'CREATE_NEW_RECORD';
export const RECORD_READ_STARTED = 'RECORD_READ_STARTED';
export const RECORD_READ_FULFILLED = 'RECORD_READ_FULFILLED';
export const RECORD_READ_REJECTED = 'RECORD_READ_REJECTED';
export const RECORD_SAVE_STARTED = 'RECORD_SAVE_STARTED';
export const RECORD_SAVE_FULFILLED = 'RECORD_SAVE_FULFILLED';
export const RECORD_SAVE_REJECTED = 'RECORD_SAVE_REJECTED';
export const RECORD_TRANSITION_STARTED = 'RECORD_TRANSITION_STARTED';
export const RECORD_TRANSITION_FULFILLED = 'RECORD_TRANSITION_FULFILLED';
export const RECORD_TRANSITION_REJECTED = 'RECORD_TRANSITION_REJECTED';
export const ADD_FIELD_INSTANCE = 'ADD_FIELD_INSTANCE';
export const DELETE_FIELD_VALUE = 'DELETE_FIELD_VALUE';
export const MOVE_FIELD_VALUE = 'MOVE_FIELD_VALUE';
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const REVERT_RECORD = 'REVERT_RECORD';
export const VALIDATION_FAILED = 'VALIDATION_FAILED';
export const VALIDATION_PASSED = 'VALIDATION_PASSED';

export const validateFieldValue = (recordTypeConfig, csid, path, value) => (dispatch, getState) => {
  const fieldDescriptor = get(recordTypeConfig, ['fields', ...dataPathToFieldDescriptorPath(path)]);
  const recordData = getRecordData(getState(), csid);

  return validateField(value, [], recordData, fieldDescriptor, true)
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

const doRead = (recordTypeConfig, vocabularyConfig, csid) => {
  const recordServicePath = recordTypeConfig.serviceConfig.servicePath;

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

  const config = {
    params: {
      showRelations: true,
      wf_deleted: false,
    },
  };

  return getSession().read(path, config);
};

export const readRecord = (recordTypeConfig, vocabularyConfig, csid) => (dispatch, getState) => {
  if (
    isRecordReadPending(getState(), csid) ||
    getRecordData(getState(), csid)
  ) {
    // We already have data for this record, or a request is already pending. Do nothing.

    return null;
  }

  dispatch({
    type: RECORD_READ_STARTED,
    meta: {
      recordTypeConfig,
      csid,
    },
  });

  return doRead(recordTypeConfig, vocabularyConfig, csid)
    .then(response => dispatch({
      type: RECORD_READ_FULFILLED,
      payload: response,
      meta: {
        recordTypeConfig,
        csid,
      },
    }))
    .catch(error => dispatch({
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
};

export const createNewRecord = (recordTypeConfig, vocabularyConfig, cloneCsid) =>
  (dispatch, getState) => {
    let readClone;

    if (cloneCsid) {
      const data = getRecordData(getState(), cloneCsid);

      if (!data) {
        // We don't have data for the record to be cloned. Read it first.

        readClone = dispatch(readRecord(recordTypeConfig, vocabularyConfig, cloneCsid));
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
          recordTypeConfig,
          cloneCsid,
        },
      }))
    );
  };

export const saveRecord =
  (recordTypeConfig, vocabularyConfig, csid, relatedSubjectCsid, onRecordCreated) =>
    (dispatch, getState) => {
      dispatch({
        type: RECORD_SAVE_STARTED,
        meta: {
          recordTypeConfig,
          csid,
          relatedSubjectCsid,
        },
      });

      const data = getRecordData(getState(), csid);

      // TODO: Compute

      return dispatch(validateRecordData(recordTypeConfig, csid))
        .then(() => {
          if (getRecordValidationErrors(getState(), csid)) {
            dispatch({
              type: RECORD_SAVE_REJECTED,
              payload: {
                code: ERR_VALIDATION,
              },
              meta: {
                recordTypeConfig,
                csid,
                relatedSubjectCsid,
              },
            });

            return null;
          }

          const title = recordTypeConfig.title(getDocument(data));
          const notificationID = getNotificationID();

          dispatch(showNotification({
            message: saveMessages.saving,
            values: {
              title,
              hasTitle: title ? 'yes' : '',
            },
            date: new Date(),
            status: STATUS_PENDING,
          }, notificationID));

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

          const config = {
            data: prepareForSending(data).toJS(),
          };

          if (csid) {
            return getSession().update(path, config)
              .then((response) => {
                dispatch(showNotification({
                  message: saveMessages.saved,
                  values: {
                    title,
                    hasTitle: title ? 'yes' : '',
                  },
                  date: new Date(),
                  status: STATUS_SUCCESS,
                  autoClose: true,
                }, notificationID));

                dispatch({
                  type: RECORD_SAVE_FULFILLED,
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
                  message: saveMessages.errorSaving,
                  values: {
                    title,
                    hasTitle: title ? 'yes' : '',
                    error: getErrorDescription(error),
                  },
                  date: new Date(),
                  status: STATUS_ERROR,
                }, notificationID));

                dispatch({
                  type: RECORD_SAVE_REJECTED,
                  payload: {
                    code: ERR_API,
                    error,
                  },
                  meta: {
                    recordTypeConfig,
                    csid,
                    relatedSubjectCsid,
                  },
                });
              });
          }

          return getSession().create(path, config)
            .then((response) => {
              if (response.status === 201 && response.headers.location) {
                const location = response.headers.location;
                const newRecordCsid = location.substring(location.lastIndexOf('/') + 1);

                return doRead(recordTypeConfig, vocabularyConfig, newRecordCsid)
                  .then((readResponse) => {
                    dispatch(showNotification({
                      message: saveMessages.saved,
                      values: {
                        title,
                        hasTitle: title ? 'yes' : '',
                      },
                      date: new Date(),
                      status: STATUS_SUCCESS,
                      autoClose: true,
                    }, notificationID));

                    dispatch({
                      type: RECORD_SAVE_FULFILLED,
                      payload: readResponse,
                      meta: {
                        recordTypeConfig,
                        csid: newRecordCsid,
                        relatedSubjectCsid,
                      },
                    });

                    if (onRecordCreated) {
                      onRecordCreated(newRecordCsid);
                    }
                  });
              }

              const error = new Error('Expected response with status 201 and a location header');
              error.response = response;

              throw error;
            })
            .catch((error) => {
              dispatch(showNotification({
                message: saveMessages.errorSaving,
                values: {
                  title,
                  hasTitle: title ? 'yes' : '',
                  error: getErrorDescription(error),
                },
                date: new Date(),
                status: STATUS_ERROR,
              }, notificationID));

              dispatch({
                type: RECORD_SAVE_REJECTED,
                payload: {
                  code: ERR_API,
                  error,
                },
                meta: {
                  recordTypeConfig,
                  csid,
                  relatedSubjectCsid,
                },
              });
            });
        });
    };

export const addFieldInstance = (recordTypeConfig, csid, path) => (dispatch) => {
  dispatch({
    type: ADD_FIELD_INSTANCE,
    meta: {
      csid,
      path,
      recordTypeConfig,
    },
  });

  dispatch(validateRecordData(recordTypeConfig, csid));
};

export const deleteFieldValue = (recordTypeConfig, csid, path) => (dispatch) => {
  dispatch({
    type: DELETE_FIELD_VALUE,
    meta: {
      csid,
      path,
    },
  });

  dispatch(validateRecordData(recordTypeConfig, csid));
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

  dispatch(validateRecordData(recordTypeConfig, csid));
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

  dispatch(validateRecordData(recordTypeConfig, csid));
};

export const revertRecord = (recordTypeConfig, csid) => (dispatch) => {
  dispatch({
    type: REVERT_RECORD,
    meta: {
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
};

export const transitionRecord = (recordTypeConfig, vocabularyConfig, csid, transitionName) =>
  (dispatch, getState) => {
    const data = getRecordData(getState(), csid);
    const title = recordTypeConfig.title(getDocument(data));
    const notificationID = getNotificationID();

    const messages = transitionMessages[transitionName];

    if (messages) {
      dispatch(showNotification({
        message: messages.transitioning,
        values: {
          title,
          hasTitle: title ? 'yes' : '',
        },
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
      .then((response) => {
        if (messages) {
          dispatch(showNotification({
            message: messages.transitioned,
            values: {
              transitionName,
              title,
              hasTitle: title ? 'yes' : '',
            },
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
          },
        });
      })
      .catch((error) => {
        if (messages) {
          dispatch(showNotification({
            message: messages.errorTransitioning,
            values: {
              transitionName,
              title,
              hasTitle: title ? 'yes' : '',
              error: getErrorDescription(error),
            },
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
