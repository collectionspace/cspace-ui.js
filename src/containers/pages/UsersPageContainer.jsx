import { connect } from 'react-redux';
import UsersPage from '../../components/pages/UsersPage';

import {
  getUserPerms,
} from '../../reducers';

const mapStateToProps = state => ({
  perms: getUserPerms(state),
});

export default connect(
  mapStateToProps,
)(UsersPage);
