import { connect } from 'react-redux';
import get from 'lodash/get';

import {
  addFieldInstance,
  moveFieldValue,
  setFieldValue,
  deleteFieldValue,
} from '../../actions/record';

import RecordForm from '../../components/record/RecordForm';

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    csid,
    recordType,
  } = ownProps;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);

  return {
    onAddInstance: (path, position) => {
      dispatch(addFieldInstance(recordTypeConfig, csid, path, position));
    },
    onCommit: (path, value) => {
      dispatch(setFieldValue(recordTypeConfig, csid, path, value));
    },
    onMoveInstance: (path, newPosition) => {
      dispatch(moveFieldValue(recordTypeConfig, csid, path, newPosition));
    },
    onRemoveInstance: (path) => {
      dispatch(deleteFieldValue(recordTypeConfig, csid, path));
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(RecordForm);
