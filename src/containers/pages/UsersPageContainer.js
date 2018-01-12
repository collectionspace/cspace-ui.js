import { connect } from 'react-redux';
import UsersPage from '../../components/pages/UsersPage';

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
)(UsersPage);
