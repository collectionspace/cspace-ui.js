import { connect } from 'react-redux';
import get from 'lodash/get';
import ReportingPage from '../../components/pages/ReportingPage';

import {
  getRecordData,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    match,
  } = ownProps;

  const csid = get(match, ['params', 'csid']);
  const data = (csid && csid !== 'new') ? getRecordData(state, csid) : undefined;

  return {
    data,
    perms: getUserPerms(state),
  };
}

export default connect(
  mapStateToProps,
)(ReportingPage);