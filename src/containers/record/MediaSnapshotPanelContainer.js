import { connect } from 'react-redux';
import MediaSnapshotPanel from '../../components/record/MediaSnapshotPanel';

import {
  getRecordData,
  getRecordRelationUpdatedTimestamp,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    recordData: getRecordData(state, csid),
    recordRelationUpdatedTimestamp: getRecordRelationUpdatedTimestamp(state, csid),
  };
};

export default connect(
  mapStateToProps,
)(MediaSnapshotPanel);
