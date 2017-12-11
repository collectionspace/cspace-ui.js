import { connect } from 'react-redux';
import RecordReportPanel from '../../components/record/RecordReportPanel';

import {
  getRecordData,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    perms: getUserPerms(state),
    recordData: getRecordData(state, csid),
  };
};

export default connect(
  mapStateToProps,
)(RecordReportPanel);
