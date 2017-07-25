import { connect } from 'react-redux';
import LoginForm from '../../components/login/LoginForm';
import { login } from '../../actions/login';

import {
  getLoginUsername,
  isLoginPending,
  getLoginError,
} from '../../reducers';

const mapStateToProps = state => ({
  isPending: isLoginPending(state),
  username: getLoginUsername(state),
  error: getLoginError(state),
});

const mapDispatchToProps = {
  onSubmit: login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
