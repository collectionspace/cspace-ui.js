import { connect } from 'react-redux';
import UsedByPanel from '../../components/record/UsedByPanel';

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

export default connect(
  mapStateToProps,
)(UsedByPanel);
