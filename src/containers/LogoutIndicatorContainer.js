import { connect } from 'react-redux';

import {
  isLogoutPending,
  getLogoutResponse,
  getLogoutError,
} from '../reducers';

import LogoutIndicator from '../components/LogoutIndicator';

const mapStateToProps = state => ({
  isPending: isLogoutPending(state),
  response: getLogoutResponse(state),
  error: getLogoutError(state),
});

export default connect(
  mapStateToProps
)(LogoutIndicator);
