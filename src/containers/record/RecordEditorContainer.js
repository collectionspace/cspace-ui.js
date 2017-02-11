import { connect } from 'react-redux';

import {
  addFieldInstance,
  moveFieldValue,
  setFieldValue,
  deleteFieldValue,
} from '../../actions/record';

import {
  getRecordData,
  isRecordModified,
} from '../../reducers';

import RecordEditor from '../../components/record/RecordEditor';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    data: getRecordData(state, csid),
    isModified: isRecordModified(state, csid),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    csid,
    recordType,
  } = ownProps;

  return {
    onAddInstance: (path) => {
      const recordTypeConfig = config.recordTypes[recordType];

      dispatch(addFieldInstance(recordTypeConfig, csid, path));
    },
    onCommit: (path, value) => {
      dispatch(setFieldValue(csid, path, value));
    },
    onMoveInstance: (path, newPosition) => {
      dispatch(moveFieldValue(csid, path, newPosition));
    },
    onRemoveInstance: (path) => {
      dispatch(deleteFieldValue(csid, path));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordEditor);
