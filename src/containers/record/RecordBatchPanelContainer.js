import { connect } from 'react-redux';
import RecordBatchPanel from '../../components/record/RecordBatchPanel';

import {
  invoke,
} from '../../actions/batch';

import {
  getRecordData,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    recordData: getRecordData(state, csid),
  };
};

const mapDispatchToProps = {
  run: invoke,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordBatchPanel);
