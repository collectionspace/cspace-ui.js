import { connect } from 'react-redux';
import RelatedRecordPanel from '../../components/record/RelatedRecordPanel';

import {
  batchUnrelateBidirectional,
} from '../../actions/relation';

import {
  clearSelected,
  setResultItemSelected,
} from '../../actions/search';

import {
  getRecordData,
  getRecordRelationUpdatedTimestamp,
  getSearchSelectedItems,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
    name,
  } = ownProps;

  return {
    recordData: getRecordData(state, csid),
    recordRelationUpdatedTimestamp: getRecordRelationUpdatedTimestamp(state, csid),
    selectedItems: getSearchSelectedItems(state, name),
  };
};

const mapDispatchToProps = {
  clearSelected,
  onItemSelectChange: setResultItemSelected,
  unrelateRecords: batchUnrelateBidirectional,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RelatedRecordPanel);
