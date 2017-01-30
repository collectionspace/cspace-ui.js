import { connect } from 'react-redux';
import RelatedObjectPanel from '../../components/record/RelatedObjectPanel';

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
)(RelatedObjectPanel);
