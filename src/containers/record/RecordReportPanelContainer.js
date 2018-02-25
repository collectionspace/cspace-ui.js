import { connect } from 'react-redux';
import RecordReportPanel from '../../components/record/RecordReportPanel';

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

export default connect(
  mapStateToProps,
)(RecordReportPanel);
