import { connect } from 'react-redux';
import RecordTitleBar from '../../components/record/RecordTitleBar';
import { getRecordData } from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    data: getRecordData(state, csid),
  };
};

export default connect(
  mapStateToProps
)(RecordTitleBar);
