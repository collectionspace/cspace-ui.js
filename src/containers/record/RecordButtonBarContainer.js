import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RecordButtonBar from '../../components/record/RecordButtonBar';
import { saveRecord } from '../../actions/record';
import { isRecordSavePending } from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    isSavePending: isRecordSavePending(state, csid),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    csid,
    recordTypeConfig,
    vocabularyConfig,
    router,
  } = ownProps;

  return {
    onSaveButtonClick: () => {
      dispatch(saveRecord(recordTypeConfig, vocabularyConfig, csid, router.replace));
    },
  };
};

export const ConnectedRecordButtonBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordButtonBar);

export default withRouter(ConnectedRecordButtonBar);
