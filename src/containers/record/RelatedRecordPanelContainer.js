import { connect } from 'react-redux';
import RelatedRecordPanel from '../../components/record/RelatedRecordPanel';

import {
  closeModal,
  openModal,
} from '../../actions/notification';

import {
  batchUnrelateBidirectional,
} from '../../actions/relation';

import {
  clearSelected,
  setAllResultItemsSelected,
  setResultItemSelected,
} from '../../actions/search';

import {
  getOpenModalName,
  getRecordData,
  getRecordRelationUpdatedTimestamp,
  getSearchSelectedItems,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
    name,
  } = ownProps;

  return {
    openModalName: getOpenModalName(state),
    perms: getUserPerms(state),
    recordData: getRecordData(state, csid),
    recordRelationUpdatedTimestamp: getRecordRelationUpdatedTimestamp(state, csid),
    selectedItems: getSearchSelectedItems(state, name),
  };
};

const mapDispatchToProps = {
  clearSelected,
  closeModal,
  openModal,
  onItemSelectChange: setResultItemSelected,
  setAllItemsSelected: setAllResultItemsSelected,
  unrelateRecords: batchUnrelateBidirectional,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RelatedRecordPanel);
