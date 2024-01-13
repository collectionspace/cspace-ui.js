import { connect } from 'react-redux';
import AuthorizedPage from '../../components/pages/AuthorizedPage';
import { receiveAuthCode } from '../../actions/login';

import {
  getLoginError,
  getLoginLandingPath,
  isLoginPending,
  isLoginSuccess,
} from '../../reducers';

const mapStateToProps = (state) => ({
  isLoginPending: isLoginPending(state),
  isLoginSuccess: isLoginSuccess(state),
  landingPath: getLoginLandingPath(state),
  loginError: getLoginError(state),
});

const mapDispatchToProps = {
  receiveAuthCode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorizedPage);
