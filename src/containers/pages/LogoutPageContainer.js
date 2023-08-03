import { connect } from 'react-redux';
import { logout } from '../../actions/logout';
import LogoutPage from '../../components/pages/LogoutPage';

const mapDispatchToProps = {
  logout,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(LogoutPage);
