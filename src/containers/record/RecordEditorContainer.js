import { connect } from 'react-redux';
import RecordEditor from '../../components/record/RecordEditor';
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
)(RecordEditor);
