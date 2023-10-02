import { connect } from 'react-redux';
import AuthorizedPage from '../../components/pages/AuthorizedPage';
import { receiveAuthCode } from '../../actions/login';

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
  receiveAuthCode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorizedPage);
