/* global window */

import { defineMessages } from 'react-intl';
import get from 'lodash/get';
import getSession from '../helpers/session';
import getErrorDescription from '../helpers/getErrorDescription';
import getNotificationID from '../helpers/notificationHelpers';
import { createInvocationData } from '../helpers/invocationHelpers';
import { getCsid } from '../helpers/recordDataHelpers';
import { getReportViewerPath, VIEWER_WINDOW_NAME } from '../helpers/reportHelpers';

import {
  validateRecordData,
} from './record';

import {
  showNotification,
} from './notification';

import {
  STATUS_ERROR,
} from '../constants/notificationStatusCodes';

import {
  getNewRecordData,
  getRecordValidationErrors,
} from '../reducers';

const messages = defineMessages({
  error: {
    id: 'report.error',
    description: 'Notification message shown when a report fails.',
    defaultMessage: 'Error running report: {error}',
  },
});

export const openReport = (config, reportMetadata, invocationDescriptor) => (
  (dispatch, getState) => {
    const reportCsid = getCsid(reportMetadata);
    const reportNameGetter = get(config, ['recordTypes', 'report', 'invocableName']);
    const reportName = reportNameGetter && reportNameGetter(reportMetadata);

    const paramRecordTypeConfig = get(config, ['invocables', 'report', reportName]);
    const paramRecordCsid = '';

    let params;
    let validateParams;

    if (paramRecordTypeConfig) {
      validateParams = dispatch(validateRecordData(paramRecordTypeConfig, paramRecordCsid))
        .then(() => {
          if (getRecordValidationErrors(getState(), paramRecordCsid)) {
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
      const viewerPath = getReportViewerPath(config, reportCsid, invocationDescriptor, params);

      window.open(viewerPath, VIEWER_WINDOW_NAME);
    });
  }
);

export const invoke = (config, csid, invocationDescriptor, params) => (dispatch) => {
  const requestConfig = {
    data: createInvocationData(config, invocationDescriptor, params),
    responseType: 'blob',
  };

  return getSession().create(`reports/${csid}/invoke`, requestConfig)
    .catch((error) => {
      const notificationID = getNotificationID();

      dispatch(showNotification({
        items: [{
          message: messages.error,
          values: {
            error: getErrorDescription(error),
          },
        }],
        date: new Date(),
        status: STATUS_ERROR,
      }, notificationID));

      throw error;
    });
};
