import { connect } from 'react-redux';
import { logout } from '../../actions/logout';
import { resetLogin } from '../../actions/login';
import LogoutPage from '../../components/pages/LogoutPage';

const mapDispatchToProps = {
  logout,
  resetLogin,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(LogoutPage);
