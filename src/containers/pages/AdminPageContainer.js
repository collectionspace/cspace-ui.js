import { connect } from 'react-redux';
import AdminPage from '../../components/pages/AdminPage';

import {
  getAdminTab,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state) => ({
  perms: getUserPerms(state),
  preferredTab: getAdminTab(state),
});

export default connect(
  mapStateToProps,
)(AdminPage);
