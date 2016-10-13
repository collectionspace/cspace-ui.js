import { connect } from 'react-redux';

import {
  isLogoutPending,
  getLogoutResponse,
} from '../../reducers';

import LogoutIndicator from '../../components/login/LogoutIndicator';

const mapStateToProps = state => ({
  isPending: isLogoutPending(state),
  response: getLogoutResponse(state),
});

export default connect(
  mapStateToProps
)(LogoutIndicator);
