/* global window */

import {
  getOpenModalName,
} from '../reducers';

import {
  STATUS_ERROR,
} from '../constants/notificationStatusCodes';

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_MODAL = 'OPEN_MODAL';

export const NOTIFICATION_ID_VALIDATION = 'NOTIFICATION_ID_VALIDATION';

const modalCloseCallbacks = {};

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

export const openModal = (name, onClose) => (dispatch) => {
  modalCloseCallbacks[name] = onClose;

  dispatch({
    type: OPEN_MODAL,
    meta: {
      name,
    },
  });
};

export const closeModal = result => (dispatch, getState) => {
  const modalName = getOpenModalName(getState());

  dispatch({
    type: CLOSE_MODAL,
  });

  const onClose = modalCloseCallbacks[modalName];

  delete modalCloseCallbacks[modalName];

  if (onClose) {
    window.setTimeout(() => {
      onClose(result);
    }, 0);
  }
};
