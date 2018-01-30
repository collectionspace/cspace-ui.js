import { connect } from 'react-redux';

import {
  closeModal,
  openModal,
} from '../../actions/notification';

import {
  clearState,
  createBidirectional,
  unrelateBidirectional,
  find,
} from '../../actions/relation';

import {
  getOpenModalName,
  getRecordData,
  getRecordError,
  getRelationFindResult,
} from '../../reducers';

import RelationEditor from '../../components/record/RelationEditor';

const mapStateToProps = (state, ownProps) => {
  const {
    subject,
    object,
    predicate,
  } = ownProps;

  return {
    objectData: getRecordData(state, object.csid),
    objectError: getRecordError(state, object.csid),
    findResult: getRelationFindResult(state, subject, object, predicate),
    openModalName: getOpenModalName(state),
  };
};

const mapDispatchToProps = {
  closeModal,
  openModal,
  createRelation: createBidirectional,
  findRelation: find,
  unrelate: unrelateBidirectional,
  onUnmount: clearState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelationEditor);
