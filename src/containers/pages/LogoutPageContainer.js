import { connect } from 'react-redux';
import LogoutPage from '../../components/pages/LogoutPage';
import { logout } from '../../actions/logout';

const mapDispatchToProps = {
  onMount: logout,
};

export default connect(
  undefined,
  mapDispatchToProps
)(LogoutPage);
