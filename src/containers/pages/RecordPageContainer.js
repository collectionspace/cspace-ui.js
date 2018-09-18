import { connect } from 'react-redux';
import withConfig from '../../enhancers/withConfig';
import RecordPage, { getParams } from '../../components/pages/RecordPage';

import {
  clearRecord,
  readRecord,
} from '../../actions/record';

import {
  setRecordPagePrimaryCsid,
} from '../../actions/recordPage';

import {
  getRecordData,
  getRecordError,
  getUserPerms,
  isRecordSidebarOpen,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = getParams(ownProps);

  return {
    data: getRecordData(state, csid),
    error: getRecordError(state, csid),
    isSidebarOpen: isRecordSidebarOpen(state),
    perms: getUserPerms(state),
  };
};

const mapDispatchToProps = {
  clearRecord,
  readRecord,
  setRecordPagePrimaryCsid,
};

export const ConnectedRecordPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordPage);

export default withConfig(ConnectedRecordPage);
