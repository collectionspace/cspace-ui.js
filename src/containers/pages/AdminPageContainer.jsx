import { connect } from 'react-redux';
import AdminPage from '../../components/pages/AdminPage';

import {
  setAdminTab,
} from '../../actions/prefs';

import {
  getAdminTab,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = state => ({
  perms: getUserPerms(state),
  preferredTab: getAdminTab(state),
});

const mapDispatchToProps = {
  onTabChange: setAdminTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminPage);
