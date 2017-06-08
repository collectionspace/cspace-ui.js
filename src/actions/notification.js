import {
  STATUS_ERROR,
} from '../constants/notificationStatusCodes';

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

const NOTIFICATION_VALIDATION = 'NOTIFICATION_VALIDATION';

export const showNotification = (notificationDescriptor, notificationID) => ({
  type: SHOW_NOTIFICATION,
  payload: notificationDescriptor,
  meta: {
    notificationID,
  },
});

export const removeNotification = notificationID => ({
  type: REMOVE_NOTIFICATION,
  meta: {
    notificationID,
  },
});

export const showValidationNotification = (recordType, csid) =>
  showNotification({
    recordType,
    csid,
    type: 'validation',
    date: new Date(),
    showCloseButton: false,
    status: STATUS_ERROR,
  }, NOTIFICATION_VALIDATION);

export const removeValidationNotification = () =>
  removeNotification(NOTIFICATION_VALIDATION);
