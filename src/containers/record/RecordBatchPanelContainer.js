import { connect } from 'react-redux';
import RecordBatchPanel from '../../components/record/RecordBatchPanel';

import {
  invoke,
} from '../../actions/batch';

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

const mapDispatchToProps = {
  invoke,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordBatchPanel);
