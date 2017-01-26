import { connect } from 'react-redux';
import TermsUsedPanel from '../../components/record/TermsUsedPanel';

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
)(TermsUsedPanel);
