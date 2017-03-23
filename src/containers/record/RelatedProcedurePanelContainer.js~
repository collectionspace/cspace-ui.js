import { connect } from 'react-redux';
import RelatedProcedurePanel from '../../components/record/RelatedProcedurePanel';

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
)(RelatedProcedurePanel);
