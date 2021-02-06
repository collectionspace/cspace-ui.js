/* global window */

import { hasBlockingError } from '../helpers/validationHelpers';

import {
  getOpenModalName,
  getRecordValidationErrors,
} from '../reducers';

import {
  STATUS_ERROR,
  STATUS_WARNING,
} from '../constants/notificationStatusCodes';

import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
  CLOSE_MODAL,
  OPEN_MODAL,
} from '../constants/actionCodes';

export const NOTIFICATION_ID_VALIDATION = 'NOTIFICATION_ID_VALIDATION';

const modalCloseCallbacks = {};

export const showNotification = (notificationDescriptor, notificationID) => ({
  type: SHOW_NOTIFICATION,
  payload: notificationDescriptor,
  meta: {
    notificationID,
  },
});

export const removeNotification = (notificationID) => ({
  type: REMOVE_NOTIFICATION,
  meta: {
    notificationID,
  },
});

export const showValidationNotification = (recordType, csid) => (dispatch, getState) => dispatch(
  showNotification({
    recordType,
    csid,
    type: 'validation',
    date: new Date(),
    status:
      hasBlockingError(getRecordValidationErrors(getState(), csid))
        ? STATUS_ERROR
        : STATUS_WARNING,
  }, NOTIFICATION_ID_VALIDATION),
);

export const removeValidationNotification = () => removeNotification(NOTIFICATION_ID_VALIDATION);

export const openModal = (name, onClose) => (dispatch, getState) => {
  const openModalName = getOpenModalName(getState());

  if (openModalName !== name) {
    if (openModalName) {
      // There's another modal open. Make sure its callback gets called when this modal is closed.
      // This lets us transfer control from one modal to another simply by opening the new one
      // without closing the previous one, since all onClose callbacks will get called at the end.
      // This is used when navigating away from movement records with unsaved changes -- first the
      // confirm navigation modal is shown, and if save is selected, control is transferred to the
      // lock modal.

      let composedOnClose;

      const pendingOnClose = modalCloseCallbacks[openModalName];

      delete modalCloseCallbacks[openModalName];

      if (pendingOnClose && onClose) {
        composedOnClose = () => {
          onClose();
          pendingOnClose();
        };
      } else if (pendingOnClose) {
        composedOnClose = pendingOnClose;
      } else {
        composedOnClose = onClose;
      }

      modalCloseCallbacks[name] = composedOnClose;
    } else {
      modalCloseCallbacks[name] = onClose;
    }

    dispatch({
      type: OPEN_MODAL,
      meta: {
        name,
      },
    });
  }
};

export const closeModal = (result) => (dispatch, getState) => {
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
