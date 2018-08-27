import { connect } from 'react-redux';

import {
  isRecordModifiedExceptPart,
} from '../../reducers';

import HierarchyInput from '../../components/record/HierarchyInput';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    isRecordModified: isRecordModifiedExceptPart(state, csid, 'rel:relations-common-list'),
  };
};

const ConnectedHierarchyInput = connect(
  mapStateToProps,
)(HierarchyInput);

ConnectedHierarchyInput.propTypes = HierarchyInput.propTypes;

export default ConnectedHierarchyInput;
