import { connect } from 'react-redux';

import {
  getLoginContinuation,
} from '../reducers';

import LoginPage from '../components/LoginPage';

const mapStateToProps = (state) => {
  return {
    continuation: getLoginContinuation(state),
  };
};

export default connect(
  mapStateToProps
)(LoginPage);
