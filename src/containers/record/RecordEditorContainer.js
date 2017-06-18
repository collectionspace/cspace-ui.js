import { connect } from 'react-redux';
import get from 'lodash/get';

import {
  closeModal,
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
  validateRecordData,
} from '../../actions/record';

import {
  getOpenModalName,
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
    openModalName: getOpenModalName(state),
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
    closeModal: (result) => {
      dispatch(closeModal(result));
    },
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
      dispatch(moveFieldValue(recordTypeConfig, csid, path, newPosition));
    },
    onRemoveInstance: (path) => {
      dispatch(deleteFieldValue(recordTypeConfig, csid, path));
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
    validateRecordData: () => {
      dispatch(validateRecordData(recordTypeConfig, csid));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordEditor);
