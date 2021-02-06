import get from 'lodash/get';
import { defineMessages } from 'react-intl';
import getSession from '../helpers/session';
import getErrorDescription from '../helpers/getErrorDescription';
import { createInvocationData } from '../helpers/invocationHelpers';
import { getCsid } from '../helpers/recordDataHelpers';
import getNotificationID from '../helpers/notificationHelpers';
import { hasBlockingError } from '../helpers/validationHelpers';
import { getNewRecordData, getRecordValidationErrors } from '../reducers';
import { showNotification } from './notification';
import { validateRecordData } from './record';

import {
  STATUS_ERROR,
  STATUS_PENDING,
  STATUS_SUCCESS,
} from '../constants/notificationStatusCodes';

import {
  BATCH_INVOKE_STARTED,
  BATCH_INVOKE_FULFILLED,
  BATCH_INVOKE_REJECTED,
} from '../constants/actionCodes';

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

export const invoke = (config, batchMetadata, invocationDescriptor, onValidationSuccess) => (
  (dispatch, getState) => {
    const batchCsid = getCsid(batchMetadata);
    const batchNameGetter = get(config, ['recordTypes', 'batch', 'invocableName']);
    const batchName = batchNameGetter && batchNameGetter(batchMetadata);

    const paramRecordTypeConfig = get(config, ['invocables', 'batch', batchName]);
    const paramRecordCsid = '';

    let params;
    let validateParams;

    if (paramRecordTypeConfig) {
      validateParams = dispatch(validateRecordData(paramRecordTypeConfig, paramRecordCsid))
        .then(() => {
          if (hasBlockingError(getRecordValidationErrors(getState(), paramRecordCsid))) {
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

      const notificationID = getNotificationID();

      dispatch({
        type: BATCH_INVOKE_STARTED,
        meta: {
          csid: batchCsid,
        },
      });

      dispatch(showNotification({
        items: [{
          message: messages.running,
          values: {
            name: batchMetadata.getIn(['document', 'ns2:batch_common', 'name']),
          },
        }],
        date: new Date(),
        status: STATUS_PENDING,
      }, notificationID));

      const requestConfig = {
        data: createInvocationData(config, invocationDescriptor, params),
      };

      return getSession().create(`batch/${batchCsid}/invoke`, requestConfig)
        .then((response) => {
          const { data } = response;
          const numAffected = get(data, ['ns2:invocationResults', 'numAffected']);
          const userNote = get(data, ['ns2:invocationResults', 'userNote']);

          let numAffectedInt;

          numAffectedInt = parseInt(numAffected, 10);

          if (Number.isNaN(numAffectedInt)) {
            numAffectedInt = undefined;
          }

          dispatch({
            type: BATCH_INVOKE_FULFILLED,
            meta: {
              csid: batchCsid,
              numAffected: numAffectedInt,
            },
          });

          dispatch(showNotification({
            items: [{
              message: messages.complete,
              values: {
                numAffected,
                userNote,
                name: batchMetadata.getIn(['document', 'ns2:batch_common', 'name']),
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
              csid: batchCsid,
            },
          });

          dispatch(showNotification({
            items: [{
              message: messages.error,
              values: {
                name: batchName,
                error: getErrorDescription(error),
              },
            }],
            date: new Date(),
            status: STATUS_ERROR,
          }, notificationID));
        });
    });
  }
);

export default {};
