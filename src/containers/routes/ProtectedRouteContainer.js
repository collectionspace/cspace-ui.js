import { connect } from 'react-redux';
import ProtectedRoute from '../../components/routes/ProtectedRoute';

import {
  getUserScreenName,
  getUserUsername,
} from '../../reducers';

import {
  redirectLogin,
} from '../../actions/login';

const mapStateToProps = state => ({
  username: getUserUsername(state),
  screenName: getUserScreenName(state),
});

const mapDispatchToProps = {
  redirectLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProtectedRoute);
