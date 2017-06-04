import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Notification from './Notification';
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

  const children = notifications.entrySeq().map((entry) => {
    const [id, descriptor] = entry;

    return (
      <Notification
        key={id}
        id={id}
        close={close}
        {...descriptor}
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
