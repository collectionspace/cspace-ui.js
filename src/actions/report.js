import { defineMessages } from 'react-intl';
import getSession from './cspace';
import getErrorDescription from '../helpers/getErrorDescription';
import getNotificationID from '../helpers/notificationHelpers';
import { createInvocationData } from '../helpers/invocationHelpers';

import {
  showNotification,
} from './notification';

import {
  STATUS_ERROR,
} from '../constants/notificationStatusCodes';

const messages = defineMessages({
  error: {
    id: 'report.error',
    description: 'Notification message shown when a report fails.',
    defaultMessage: 'Error running report: {error}',
  },
});

export const invoke = (config, csid, invocationDescriptor) => (dispatch) => {
  const requestConfig = {
    data: createInvocationData(config, invocationDescriptor),
    responseType: 'blob',
  };

  return getSession().create(`reports/${csid}`, requestConfig)
    .catch((error) => {
      const notificationID = getNotificationID();

      dispatch(showNotification({
        message: messages.error,
        values: {
          error: getErrorDescription(error),
        },
        date: new Date(),
        status: STATUS_ERROR,
      }, notificationID));

      throw error;
    });
};

export default {};
