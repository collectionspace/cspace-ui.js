import { connect } from 'react-redux';
import get from 'lodash/get';

import {
  removeValidationNotification,
} from '../../actions/notification';

import {
  createNewRecord,
  readRecord,
  addFieldInstance,
  moveFieldValue,
  setFieldValue,
  deleteFieldValue,
  revertRecord,
  saveRecord,
} from '../../actions/record';

import {
  getRecordData,
  getRecordValidationErrors,
  isRecordModified,
  isRecordSavePending,
} from '../../reducers';

import RecordEditor from '../../components/record/RecordEditor';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    data: getRecordData(state, csid),
    isModified: isRecordModified(state, csid),
    isSavePending: isRecordSavePending(state, csid),
    validationErrors: getRecordValidationErrors(state, csid),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    csid,
    relatedSubjectCsid,
    recordType,
    vocabulary,
  } = ownProps;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);

  const vocabularyConfig = vocabulary
    ? get(recordTypeConfig, ['vocabularies', vocabulary])
    : undefined;

  return {
    createNewRecord: (cloneCsid) => {
      dispatch(createNewRecord(recordTypeConfig, vocabularyConfig, cloneCsid));
    },
    readRecord: () => {
      dispatch(readRecord(recordTypeConfig, vocabularyConfig, csid));
    },
    onAddInstance: (path) => {
      dispatch(addFieldInstance(recordTypeConfig, csid, path));
    },
    onCommit: (path, value) => {
      dispatch(setFieldValue(recordTypeConfig, csid, path, value));
    },
    onMoveInstance: (path, newPosition) => {
      dispatch(moveFieldValue(csid, path, newPosition));
    },
    onRemoveInstance: (path) => {
      dispatch(deleteFieldValue(csid, path));
    },
    revert: () => {
      dispatch(revertRecord(recordTypeConfig, csid));
    },
    save: (onRecordCreated) => {
      dispatch(
        saveRecord(recordTypeConfig, vocabularyConfig, csid, relatedSubjectCsid, onRecordCreated)
      );
    },
    removeValidationNotification: () => {
      dispatch(removeValidationNotification());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordEditor);
