import { connect } from 'react-redux';
import PasswordResetRequestForm from '../../components/user/PasswordResetRequestForm';
import withConfig from '../../enhancers/withConfig';

import {
  requestPasswordReset,
} from '../../actions/account';

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestReset: email => dispatch(requestPasswordReset(email, ownProps.config.tenantId)),
});

export const ConnectedPasswordResetRequestForm = connect(
  undefined,
  mapDispatchToProps,
)(PasswordResetRequestForm);

export default withConfig(ConnectedPasswordResetRequestForm);
