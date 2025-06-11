import { connect } from 'react-redux';
import AuthStatus from '../../components/login/AuthStatus';

import {
  getLoginUsername,
  getIsLoginPending,
  getIsLoginSuccess,
  getLoginError,
} from '../../reducers';

const mapStateToProps = (state) => ({
  isPending: getIsLoginPending(state),
  isSuccess: getIsLoginSuccess(state),
  username: getLoginUsername(state),
  error: getLoginError(state),
});

export default connect(
  mapStateToProps,
)(AuthStatus);
