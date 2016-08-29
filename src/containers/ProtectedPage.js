import { connect } from 'react-redux';

import { getUserUsername } from '../reducers';
import ProtectedPage from '../components/ProtectedPage';

const mapStateToProps = (state) => {
  return {
    username: getUserUsername(state),
  }
};

export default connect(
  mapStateToProps
)(ProtectedPage);
