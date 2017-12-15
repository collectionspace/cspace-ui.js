import { connect } from 'react-redux';
import PasswordResetForm from '../../components/user/PasswordResetForm';

import {
  resetPassword,
} from '../../actions/account';

const mapDispatchToProps = ({
  reset: resetPassword,
});

export default connect(
  undefined,
  mapDispatchToProps,
)(PasswordResetForm);
