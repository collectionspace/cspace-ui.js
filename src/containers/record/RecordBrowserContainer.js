import { connect } from 'react-redux';
import RecordBrowser from '../../components/record/RecordBrowser';

import {
  clearRelatedRecordBrowserRelatedCsid,
} from '../../actions/recordBrowser';

const mapDispatchToProps = {
  clearPreferredRelatedCsid: clearRelatedRecordBrowserRelatedCsid,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(RecordBrowser);
