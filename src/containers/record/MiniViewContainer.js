import { connect } from 'react-redux';
import get from 'lodash/get';

import MiniView from '../../components/record/MiniView';

import {
  readRecord,
  validateRecordData,
} from '../../actions/record';

import {
  setForm,
} from '../../actions/prefs';

import {
  getRecordData,
  getForm,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
    recordType,
  } = ownProps;

  return {
    data: getRecordData(state, csid),
    formName: getForm(state, recordType),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    csid,
    recordType,
    vocabulary,
  } = ownProps;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);

  const vocabularyConfig = vocabulary
    ? get(recordTypeConfig, ['vocabularies', vocabulary])
    : undefined;

  return {
    readRecord: () => {
      dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid));
    },
    setForm: (formName) => {
      dispatch(setForm(recordType, formName));
    },
    validateRecordData: () => {
      dispatch(validateRecordData(recordTypeConfig, csid));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniView);
