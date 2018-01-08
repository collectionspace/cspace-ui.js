import { connect } from 'react-redux';
import LoginPage from '../../components/pages/LoginPage';
import { resetLogin } from '../../actions/login';
import { closeModal } from '../../actions/notification';

const mapDispatchToProps = {
  closeModal,
  resetLogin,
};

export default connect(
  undefined,
  mapDispatchToProps
)(LoginPage);
