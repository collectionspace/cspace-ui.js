import { connect } from 'react-redux';
import AuthStatus from '../../components/login/AuthStatus';

import {
  getLoginUsername,
  isLoginPending,
  isLoginSuccess,
  getLoginError,
} from '../../reducers';

const mapStateToProps = (state) => ({
  isPending: isLoginPending(state),
  isSuccess: isLoginSuccess(state),
  username: getLoginUsername(state),
  error: getLoginError(state),
});

export default connect(
  mapStateToProps,
)(AuthStatus);
