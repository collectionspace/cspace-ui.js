import { connect } from 'react-redux';
import LoginPage from '../../components/pages/LoginPage';
import { resetLogin } from '../../actions/login';

const mapDispatchToProps = {
  onMount: resetLogin,
};

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
