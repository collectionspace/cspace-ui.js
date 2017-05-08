import { connect } from 'react-redux';

import {
  find,
} from '../../actions/relation';

import {
  getRelationFindResult,
} from '../../reducers';

import HierarchySiblingList from '../../components/record/HierarchySiblingList';

const mapStateToProps = (state, ownProps) => {
  const {
    parentCsid,
    recordType,
  } = ownProps;

  const subject = {
    recordType,
  };

  const object = {
    recordType,
    csid: parentCsid,
  };

  return {
    findResult: getRelationFindResult(state, subject, object, 'hasBroader'),
  };
};

const mapDispatchToProps = {
  findRelations: find,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HierarchySiblingList);
