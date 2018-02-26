import { connect } from 'react-redux';
import AccountPage from '../../components/pages/AccountPage';

import {
  setAdminTab,
} from '../../actions/prefs';

import {
  getUserPerms,
  getUserUserId,
} from '../../reducers';

const mapStateToProps = state => ({
  perms: getUserPerms(state),
  userId: getUserUserId(state),
});

const mapDispatchToProps = {
  setAdminTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountPage);
