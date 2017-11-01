import { connect } from 'react-redux';
import MediaSnapshotPanel from '../../components/record/MediaSnapshotPanel';

import {
  getRecordData,
  getRecordRelationUpdatedTimestamp,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    perms: getUserPerms(state),
    recordData: getRecordData(state, csid),
    recordRelationUpdatedTimestamp: getRecordRelationUpdatedTimestamp(state, csid),
  };
};

export default connect(
  mapStateToProps,
)(MediaSnapshotPanel);
