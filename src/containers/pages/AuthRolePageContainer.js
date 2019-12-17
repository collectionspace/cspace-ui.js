import { connect } from 'react-redux';
import AuthRolePage from '../../components/pages/AuthRolePage';

import {
  setAdminTab,
} from '../../actions/prefs';

import {
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state) => ({
  perms: getUserPerms(state),
});

const mapDispatchToProps = {
  setAdminTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthRolePage);
