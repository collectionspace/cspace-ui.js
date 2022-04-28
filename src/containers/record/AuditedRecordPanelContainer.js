import { connect } from 'react-redux';
import AuditRecordPanel from '../../components/record/AuditedRecordPanel';
import { getRecordData } from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    recordData: getRecordData(state, csid),
  };
};

export default connect(mapStateToProps)(AuditRecordPanel);
