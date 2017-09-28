import { connect } from 'react-redux';
import withConfig from '../../enhancers/withConfig';
import RecordPage, { getParams } from '../../components/pages/RecordPage';

import {
  readRecord,
} from '../../actions/record';

import {
  getRecordData,
  getRecordError,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = getParams(ownProps);

  return {
    data: getRecordData(state, csid),
    error: getRecordError(state, csid),
  };
};

const mapDispatchToProps = {
  readRecord,
};

export const ConnectedRecordPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordPage);

export default withConfig(ConnectedRecordPage);
