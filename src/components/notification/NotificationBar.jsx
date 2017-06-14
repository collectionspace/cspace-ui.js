import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import Notification from './Notification';
import ValidationErrorNotificationContainer from '../../containers/notification/ValidationErrorNotificationContainer';
import styles from '../../../styles/cspace-ui/NotificationBar.css';

const propTypes = {
  close: PropTypes.func,
  notifications: PropTypes.instanceOf(Immutable.OrderedMap),
};

export default function NotificationBar(props) {
  const {
    close,
    notifications,
  } = props;

  const children = notifications.entrySeq().reverse().map((entry) => {
    const [id, descriptor] = entry;

    const {
      type,
      ...remainingProps
    } = descriptor;

    const NotificationComponent = (type === 'validation')
      ? ValidationErrorNotificationContainer
      : Notification;

    return (
      <NotificationComponent
        key={id}
        id={id}
        close={close}
        {...remainingProps}
      />
    );
  }).toJS();

  return (
    <div className={styles.common}>
      {children}
    </div>
  );
}

NotificationBar.propTypes = propTypes;
