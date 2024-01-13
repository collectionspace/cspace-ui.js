import { connect } from 'react-redux';
import LoginModal from '../../components/login/LoginModal';
import { openLoginWindow } from '../../actions/login';

import {
  getLoginError,
  isLoginPending,
  isLoginSuccess,
  isLoginWindowOpen,
  isLoginWindowOpenFailed,
} from '../../reducers';

const mapStateToProps = (state) => ({
  isLoginPending: isLoginPending(state),
  isLoginSuccess: isLoginSuccess(state),
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
