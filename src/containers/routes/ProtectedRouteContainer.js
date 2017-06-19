import { connect } from 'react-redux';
import ProtectedRoute from '../../components/routes/ProtectedRoute';
import { getUserUsername } from '../../reducers';

import {
  redirectLogin,
} from '../../actions/login';

const mapStateToProps = state => ({
  username: getUserUsername(state),
});

const mapDispatchToProps = {
  redirectLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProtectedRoute);
