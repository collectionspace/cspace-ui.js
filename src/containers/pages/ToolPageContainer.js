import { connect } from 'react-redux';
import ToolPage from '../../components/pages/ToolPage';

import {
  getToolTab,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state) => ({
  perms: getUserPerms(state),
  preferredTab: getToolTab(state),
});

export default connect(
  mapStateToProps,
)(ToolPage);
