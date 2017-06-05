import { connect } from 'react-redux';
import NotificationBar from '../../components/notification/NotificationBar';

import {
  removeNotification,
} from '../../actions/notification';

import {
  getNotifications,
} from '../../reducers';

const mapStateToProps = state => ({
  notifications: getNotifications(state),
});

const mapDispatchToProps = {
  close: removeNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationBar);
