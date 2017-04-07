import { connect } from 'react-redux';

import {
  clearState,
  createBidirectional,
  find,
} from '../../actions/relation';

import { getRelationFindResult } from '../../reducers';

import RelationEditor from '../../components/record/RelationEditor';

const mapStateToProps = (state, ownProps) => {
  const {
    subject,
    object,
    predicate,
  } = ownProps;

  return {
    findResult: getRelationFindResult(state, { subject, object, predicate }),
  };
};

const mapDispatchToProps = {
  createRelation: createBidirectional,
  findRelation: find,
  onUnmount: clearState,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelationEditor);
