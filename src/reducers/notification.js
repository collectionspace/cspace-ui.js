import Immutable from 'immutable';
import getNotificationID from '../helpers/notificationHelpers';

import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../actions/notification';

const showNotification = (state, action) => {
  const notificationDescriptor = action.payload;

  let {
    notificationID,
  } = action.meta;

  if (!notificationID) {
    notificationID = getNotificationID();
  }

  return state.set(notificationID, notificationDescriptor);
};

const removeNotification = (state, action) => {
  const {
    notificationID,
  } = action.meta;

  return state.delete(notificationID);
};

export default (state = Immutable.OrderedMap(), action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return showNotification(state, action);
    case REMOVE_NOTIFICATION:
      return removeNotification(state, action);
    default:
      return state;
  }
};

export const getAll = state => state;
