import { connect } from 'react-redux';
import RecordReportPanel from '../../components/record/RecordReportPanel';

import {
  openReport,
} from '../../actions/report';

import {
  getRecordData,
  getUserPerms,
  isRecordModified,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    isRecordModified: isRecordModified(state, csid),
    perms: getUserPerms(state),
    recordData: getRecordData(state, csid),
  };
};

const mapDispatchToProps = {
  openReport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordReportPanel);
