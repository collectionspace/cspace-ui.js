/* global window */

import { defineMessages } from 'react-intl';
import getSession from '../helpers/session';
import getErrorDescription from '../helpers/getErrorDescription';
import getNotificationID from '../helpers/notificationHelpers';

import {
  createInvocationData,
  getExportViewerPath,
  storeInvocationDescriptor,
  VIEWER_WINDOW_NAME,
} from '../helpers/invocationHelpers';

import {
  showNotification,
} from './notification';

import {
  STATUS_ERROR,
} from '../constants/notificationStatusCodes';

const messages = defineMessages({
  error: {
    id: 'export.error',
    description: 'Notification message shown when an export fails.',
    defaultMessage: 'Error generating export: {error}',
  },
});

export const openExport = (config, invocationDescriptor) => () => {
  storeInvocationDescriptor(invocationDescriptor);

  const viewerPath = getExportViewerPath(config, invocationDescriptor);

  return new Promise((resolve) => {
    window.open(viewerPath, VIEWER_WINDOW_NAME);

    resolve();
  });
};

export const invoke = (config, invocationDescriptor) => (dispatch) => {
  const requestConfig = {
    data: createInvocationData(config, invocationDescriptor),
    responseType: 'blob',
  };

  return getSession().create('exports', requestConfig)
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
