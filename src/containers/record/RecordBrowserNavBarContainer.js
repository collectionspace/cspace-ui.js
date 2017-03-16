import { connect } from 'react-redux';
import RecordBrowserNavBar from '../../components/record/RecordBrowserNavBar';
import { setRecordBrowserNavBarItems } from '../../actions/prefs';
import { getRecordBrowserNavBarItems } from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    recordType,
  } = ownProps;

  return {
    items: getRecordBrowserNavBarItems(state, recordType),
  };
};

const mapDispatchToProps = {
  setItems: setRecordBrowserNavBarItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordBrowserNavBar);
