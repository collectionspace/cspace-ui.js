import get from 'lodash/get';
import { defineMessages } from 'react-intl';
import getSession from './cspace';
import getErrorDescription from '../helpers/getErrorDescription';
import { createInvocationData, getBatchName } from '../helpers/invocationHelpers';
import getNotificationID from '../helpers/notificationHelpers';
import { getNewRecordData, getRecordValidationErrors } from '../reducers';
import { showNotification } from './notification';
import { validateRecordData } from './record';

import {
  STATUS_ERROR,
  STATUS_PENDING,
  STATUS_SUCCESS,
} from '../constants/notificationStatusCodes';

export const BATCH_INVOKE_STARTED = 'BATCH_INVOKE_STARTED';
export const BATCH_INVOKE_FULFILLED = 'BATCH_INVOKE_FULFILLED';
export const BATCH_INVOKE_REJECTED = 'BATCH_INVOKE_REJECTED';

const messages = defineMessages({
  running: {
    id: 'batch.running',
    description: 'Notification message shown when a batch job is running.',
    defaultMessage: 'Running {name}…',
  },
  complete: {
    id: 'batch.complete',
    description: 'Notification message shown when a batch job has completed.',
    defaultMessage: `Completed {name}: {numAffected, plural,
      =0 {No records}
      one {# record}
      other {# records}
    } affected. {userNote}`,
  },
  error: {
    id: 'batch.error',
    description: 'Notification message shown when a batch job fails.',
    defaultMessage: 'Error running {name}: {error}',
  },
});

export const invoke = (config, batchItem, invocationDescriptor, onValidationSuccess) =>
  (dispatch, getState) => {
    const batchName = getBatchName(batchItem);
    const recordTypeConfig = get(config, ['invocables', 'batch', batchName]);
    const paramsRecordCsid = '';

    let params;
    let validateParams;

    if (recordTypeConfig) {
      validateParams = dispatch(validateRecordData(recordTypeConfig, paramsRecordCsid))
        .then(() => {
          if (getRecordValidationErrors(getState(), paramsRecordCsid)) {
            return Promise.reject();
          }

          const data = getNewRecordData(getState());

          params = data && data.first().toJS();

          return Promise.resolve();
        });
    } else {
      validateParams = Promise.resolve();
    }

    return validateParams.then(() => {
      if (onValidationSuccess) {
        onValidationSuccess();
      }

      const invocationDescriptorWithParams = Object.assign({}, invocationDescriptor, { params });

      const csid = batchItem.get('csid');
      const name = batchItem.get('name');

      const notificationID = getNotificationID();

      dispatch({
        type: BATCH_INVOKE_STARTED,
        meta: {
          csid,
        },
      });

      dispatch(showNotification({
        items: [{
          message: messages.running,
          values: {
            name,
          },
        }],
        date: new Date(),
        status: STATUS_PENDING,
      }, notificationID));

      const requestConfig = {
        data: createInvocationData(config, invocationDescriptorWithParams, 'batch'),
      };

      return getSession().create(`batch/${csid}`, requestConfig)
        .then((response) => {
          const { data } = response;
          const numAffected = get(data, ['ns2:invocationResults', 'numAffected']);
          const userNote = get(data, ['ns2:invocationResults', 'userNote']);

          let numAffectedInt;

          numAffectedInt = parseInt(numAffected, 10);

          if (isNaN(numAffectedInt)) {
            numAffectedInt = undefined;
          }

          dispatch({
            type: BATCH_INVOKE_FULFILLED,
            meta: {
              csid,
              numAffected: numAffectedInt,
            },
          });

          dispatch(showNotification({
            items: [{
              message: messages.complete,
              values: {
                name,
                numAffected,
                userNote,
              },
            }],
            date: new Date(),
            status: STATUS_SUCCESS,
            autoClose: true,
          }, notificationID));

          return response;
        })
        .catch((error) => {
          dispatch({
            type: BATCH_INVOKE_REJECTED,
            meta: {
              csid,
            },
          });

          dispatch(showNotification({
            items: [{
              message: messages.error,
              values: {
                name,
                error: getErrorDescription(error),
              },
            }],
            date: new Date(),
            status: STATUS_ERROR,
          }, notificationID));
        });
    });
  };

export default {};
