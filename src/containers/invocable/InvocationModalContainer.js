import { connect } from 'react-redux';
import get from 'lodash/get';
import { readRecord } from '../../actions/record';
import { searchCsid } from '../../actions/search';
import { getRecordData } from '../../reducers';
import InvocationModal from '../../components/invocable/InvocationModal';

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
    config,
    csid,
    recordType,
  } = ownProps;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);

  return {
    readRecord: () => dispatch(readRecord(config, recordTypeConfig, undefined, csid)),
    searchCsid: (...args) => dispatch(searchCsid(...args)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvocationModal);
