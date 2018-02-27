import { connect } from 'react-redux';

import {
  isRecordModified,
} from '../../reducers';

import HierarchyInput from '../../components/record/HierarchyInput';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    isRecordModified: isRecordModified(state, csid),
  };
};

const ConnectedHierarchyInput = connect(
  mapStateToProps,
)(HierarchyInput);

ConnectedHierarchyInput.propTypes = HierarchyInput.propTypes;

export default ConnectedHierarchyInput;
