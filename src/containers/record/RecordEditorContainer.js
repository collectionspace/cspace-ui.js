import { connect } from 'react-redux';

import {
  addFieldInstance,
  moveFieldValue,
  setFieldValue,
  deleteFieldValue,
} from '../../actions/record';

import {
  getRecordData,
} from '../../reducers';

import RecordEditor from '../../components/record/RecordEditor';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    data: getRecordData(state, csid),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    onAddInstance: (path) => {
      dispatch(addFieldInstance(csid, path));
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
