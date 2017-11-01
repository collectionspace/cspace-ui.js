import { connect } from 'react-redux';
import CreatePage from '../../components/pages/CreatePage';

import {
  getUserPerms,
} from '../../reducers';

const mapStateToProps = state => ({
  perms: getUserPerms(state),
});

export default connect(
  mapStateToProps,
)(CreatePage);
