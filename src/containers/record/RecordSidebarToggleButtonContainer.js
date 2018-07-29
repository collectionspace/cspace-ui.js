import { connect } from 'react-redux';
import RecordSidebarToggleButton from '../../components/record/RecordSidebarToggleButton';

import {
  toggleRecordSidebar,
} from '../../actions/prefs';

import {
  isRecordSidebarOpen,
} from '../../reducers';

const mapStateToProps = state => ({
  isRecordSidebarOpen: isRecordSidebarOpen(state),
});

const mapDispatchToProps = {
  toggleRecordSidebar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordSidebarToggleButton);
