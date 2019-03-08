import { connect } from 'react-redux';
import qs from 'qs';
import ReportViewerPage from '../../components/pages/ReportViewerPage';
import withConfig from '../../enhancers/withConfig';

import {
  invoke,
} from '../../actions/report';

const mapDispatchToProps = (dispatch, ownProps) => ({
  readContent: (location, match) => {
    const invocationDescriptor = qs.parse(location.search, { ignoreQueryPrefix: true });
    const { params } = invocationDescriptor;

    if (params) {
      invocationDescriptor.params = JSON.parse(params);
    }

    return dispatch(invoke(ownProps.config, match.params.reportCsid, invocationDescriptor));
  },
});

export const ConnectedReportViewerPage = connect(
  undefined,
  mapDispatchToProps,
)(ReportViewerPage);

export default withConfig(ConnectedReportViewerPage);
