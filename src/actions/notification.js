import {
  STATUS_ERROR,
} from '../constants/notificationStatusCodes';

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const NOTIFICATION_ID_VALIDATION = 'NOTIFICATION_ID_VALIDATION';

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
    status: STATUS_ERROR,
  }, NOTIFICATION_ID_VALIDATION);

export const removeValidationNotification = () =>
  removeNotification(NOTIFICATION_ID_VALIDATION);
