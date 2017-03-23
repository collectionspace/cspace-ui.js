import { connect } from 'react-redux';
import RelatedRecordPanel from '../../components/record/RelatedRecordPanel';

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
)(RelatedRecordPanel);
