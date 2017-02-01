import { connect } from 'react-redux';
import RelatedMediaPanel from '../../components/record/RelatedMediaPanel';

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
)(RelatedMediaPanel);
