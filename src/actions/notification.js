export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

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
