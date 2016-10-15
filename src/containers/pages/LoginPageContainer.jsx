import { connect } from 'react-redux';
import LoginPage from '../../components/pages/LoginPage';
import { resetLogin } from '../../actions/login';
import { getLoginContinuation } from '../../reducers';

const mapStateToProps = state => ({
  continuation: getLoginContinuation(state),
});

const mapDispatchToProps = {
  onMount: resetLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
