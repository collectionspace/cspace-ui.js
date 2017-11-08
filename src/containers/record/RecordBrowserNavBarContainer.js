import { connect } from 'react-redux';
import RecordBrowserNavBar from '../../components/record/RecordBrowserNavBar';
import { setRecordBrowserNavBarItems } from '../../actions/prefs';

import {
  getRecordBrowserNavBarItems,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    recordType,
  } = ownProps;

  return {
    items: getRecordBrowserNavBarItems(state, recordType),
    perms: getUserPerms(state),
  };
};

const mapDispatchToProps = {
  setItems: setRecordBrowserNavBarItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordBrowserNavBar);
