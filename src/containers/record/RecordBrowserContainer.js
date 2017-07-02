import { connect } from 'react-redux';
import RecordBrowser from '../../components/record/RecordBrowser';

import {
  clearRelatedRecordBrowserRelatedCsid,
} from '../../actions/recordBrowser';

import {
  clearSearchResults,
} from '../../actions/search';

const mapDispatchToProps = {
  clearSearchResults,
  clearPreferredRelatedCsid: clearRelatedRecordBrowserRelatedCsid,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(RecordBrowser);
