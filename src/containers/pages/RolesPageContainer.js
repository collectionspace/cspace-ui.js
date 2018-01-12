import { connect } from 'react-redux';
import RolesPage from '../../components/pages/RolesPage';

import {
  setAdminTab,
} from '../../actions/prefs';

import {
  getUserPerms,
} from '../../reducers';

const mapStateToProps = state => ({
  perms: getUserPerms(state),
});

const mapDispatchToProps = {
  setAdminTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RolesPage);
