import Immutable from 'immutable';
import getNotificationID from '../helpers/notificationHelpers';

import {
  SHOW_NOTIFICATION,
  REMOVE_NOTIFICATION,
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions/notification';

const showNotification = (state, action) => {
  const notificationDescriptor = action.payload;

  let {
    notificationID,
  } = action.meta;

  if (!notificationID) {
    notificationID = getNotificationID();
  }

  return state.setIn(['notifications', notificationID], notificationDescriptor);
};

const removeNotification = (state, action) => {
  const {
    notificationID,
  } = action.meta;

  return state.deleteIn(['notifications', notificationID]);
};

export default (state = Immutable.Map({ notifications: Immutable.OrderedMap() }), action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return showNotification(state, action);
    case REMOVE_NOTIFICATION:
      return removeNotification(state, action);
    case OPEN_MODAL:
      return state.set('modal', action.meta.name);
    case CLOSE_MODAL:
      return state.delete('modal');
    default:
      return state;
  }
};

export const getModal = state => state.get('modal');
export const getNotifications = state => state.get('notifications');
