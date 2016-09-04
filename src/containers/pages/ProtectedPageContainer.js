import { connect } from 'react-redux';

import ProtectedPage from '../../components/pages/ProtectedPage';

import { getUserUsername } from '../../reducers';

const mapStateToProps = state => ({
  username: getUserUsername(state),
});

export default connect(
  mapStateToProps
)(ProtectedPage);
