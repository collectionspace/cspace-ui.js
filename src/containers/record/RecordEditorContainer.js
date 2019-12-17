import { connect } from 'react-redux';
import get from 'lodash/get';

import {
  checkForRoleUses,
} from '../../actions/account';

import {
  checkForUses,
} from '../../actions/authority';

import {
  closeModal,
  openModal,
  removeNotification,
  removeValidationNotification,
} from '../../actions/notification';

import {
  setForm,
} from '../../actions/prefs';

import {
  createNewRecord,
  deleteRecord,
  readRecord,
  revertRecord,
  saveRecord,
  saveRecordWithTransition,
  transitionRecord,
  validateRecordData,
} from '../../actions/record';

import {
  checkForRelations,
} from '../../actions/relation';

import {
  getAuthorityVocabWorkflowState,
  getForm,
  getOpenModalName,
  getRecordData,
  getRecordValidationErrors,
  getSubrecordData,
  getUserPerms,
  getUserRoleNames,
  isRecordModified,
  isRecordReadPending,
  isRecordSavePending,
  isRecordSidebarOpen,
} from '../../reducers';

import RecordEditor from '../../components/record/RecordEditor';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
    perms,
    recordType,
    vocabulary,
  } = ownProps;

  // If perms are supplied in ownProps, use them instead of getting perms from state.
  // This allows parent components to supply filtered perms.

  return {
    data: getRecordData(state, csid),
    formName: getForm(state, recordType),
    isModified: isRecordModified(state, csid),
    isReadPending: isRecordReadPending(state, csid),
    isSavePending: isRecordSavePending(state, csid),
    isSidebarOpen: isRecordSidebarOpen(state),
    openModalName: getOpenModalName(state),
    perms: perms || getUserPerms(state),
    roleNames: getUserRoleNames(state),
    subrecordData: getSubrecordData(state, csid),
    validationErrors: getRecordValidationErrors(state, csid),
    vocabularyWorkflowState: getAuthorityVocabWorkflowState(state, recordType, vocabulary),
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
    openModal: (modalName) => {
      dispatch(openModal(modalName));
    },
    createNewRecord: (cloneCsid) => {
      dispatch(createNewRecord(config, recordTypeConfig, vocabularyConfig, cloneCsid));
    },
    deleteRecord: () => dispatch(
      deleteRecord(config, recordTypeConfig, vocabularyConfig, csid, relatedSubjectCsid),
    ),
    readRecord: () => dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid)),
    revert: () => {
      dispatch(revertRecord(recordTypeConfig, csid));
    },
    save: (onRecordCreated) => dispatch(saveRecord(
      config, recordTypeConfig, vocabularyConfig, csid, undefined, undefined,
      relatedSubjectCsid, onRecordCreated,
    ))
      .catch(() => {}),
    saveWithTransition: (transitionName, onRecordCreated) => dispatch(saveRecordWithTransition(
      config, recordTypeConfig, vocabularyConfig, csid, undefined, undefined,
      relatedSubjectCsid, transitionName, onRecordCreated,
    ))
      .catch(() => {}),
    setForm: (formName) => {
      dispatch(setForm(recordType, formName));
      dispatch(validateRecordData(recordTypeConfig, csid));
    },
    transitionRecord: (transitionName) => dispatch(transitionRecord(
      config, recordTypeConfig, vocabularyConfig, csid, transitionName, relatedSubjectCsid,
    )),
    removeNotification: (notificationID) => {
      dispatch(removeNotification(notificationID));
    },
    removeValidationNotification: () => {
      dispatch(removeValidationNotification());
    },
    validateRecordData: () => {
      dispatch(validateRecordData(recordTypeConfig, csid));
    },
    checkForRelations: (predicate) => dispatch(checkForRelations(csid, predicate)),
    checkForUses: () => dispatch(checkForUses(config, recordType, vocabulary, csid)),
    checkForRoleUses: () => dispatch(checkForRoleUses(csid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordEditor);
