import { connect } from 'react-redux';
import ValidationErrorNotification from '../../components/notification/ValidationErrorNotification';

import {
  getRecordValidationErrors,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => ({
  errors: getRecordValidationErrors(state, ownProps.csid),
});

export default connect(
  mapStateToProps,
)(ValidationErrorNotification);
