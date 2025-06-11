import { connect } from 'react-redux';
import LoginModal from '../../components/login/LoginModal';
import { openLoginWindow } from '../../actions/login';

import {
  getLoginError,
  getIsLoginPending,
  getIsLoginSuccess,
  isLoginWindowOpen,
  isLoginWindowOpenFailed,
} from '../../reducers';

const mapStateToProps = (state) => ({
  isLoginPending: getIsLoginPending(state),
  isLoginSuccess: getIsLoginSuccess(state),
  isLoginWindowOpen: isLoginWindowOpen(state),
  isLoginWindowOpenFailed: isLoginWindowOpenFailed(state),
  loginError: getLoginError(state),
});

const mapDispatchToProps = {
  openLoginWindow,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginModal);
