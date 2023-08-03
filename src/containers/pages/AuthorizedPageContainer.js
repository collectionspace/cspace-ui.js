import { connect } from 'react-redux';
import AuthorizedPage from '../../components/pages/AuthorizedPage';
import { loginWithAuthCodeRequest } from '../../actions/login';

import {
  getLoginUsername,
  isLoginPending,
  isLoginSuccess,
  getLoginLandingPath,
  getLoginError,
} from '../../reducers';

const mapStateToProps = (state) => ({
  isPending: isLoginPending(state),
  isSuccess: isLoginSuccess(state),
  landingPath: getLoginLandingPath(state),
  username: getLoginUsername(state),
  error: getLoginError(state),
});

const mapDispatchToProps = {
  loginWithAuthCodeRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorizedPage);
