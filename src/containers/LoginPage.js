import { connect } from 'react-redux';

import {
  getLoginContinuation,
} from '../reducers';

import LoginPage from '../components/LoginPage';

const mapStateToProps = state => ({
  continuation: getLoginContinuation(state),
});

export default connect(
  mapStateToProps
)(LoginPage);
