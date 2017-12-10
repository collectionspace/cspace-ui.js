import { connect } from 'react-redux';
import RolesPage from '../../components/pages/RolesPage';

import {
  getUserPerms,
} from '../../reducers';

const mapStateToProps = state => ({
  perms: getUserPerms(state),
});

export default connect(
  mapStateToProps,
)(RolesPage);
