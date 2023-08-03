import { connect } from 'react-redux';
import ProtectedRoute from '../../components/routes/ProtectedRoute';

import {
  areUserPrefsLoaded,
  getOpenModalName,
  getUserScreenName,
  getUserUsername,
  getUserPerms,
} from '../../reducers';

import {
  closeModal,
} from '../../actions/notification';

const mapStateToProps = (state) => ({
  openModalName: getOpenModalName(state),
  perms: getUserPerms(state),
  username: getUserUsername(state),
  userPrefsLoaded: areUserPrefsLoaded(state),
  screenName: getUserScreenName(state),
});

const mapDispatchToProps = {
  closeModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProtectedRoute);
