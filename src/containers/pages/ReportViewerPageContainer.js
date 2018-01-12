import { connect } from 'react-redux';
import qs from 'qs';
import ReportViewerPage from '../../components/pages/ReportViewerPage';
import withConfig from '../../enhancers/withConfig';

import {
  invoke,
} from '../../actions/report';

const mapDispatchToProps = (dispatch, ownProps) => ({
  readContent: (location, match) => {
    const invocationContext = qs.parse(location.search, { ignoreQueryPrefix: true });

    return dispatch(invoke(ownProps.config, match.params.reportCsid, invocationContext));
  },
});

export const ConnectedReportViewerPage = connect(
  undefined,
  mapDispatchToProps,
)(ReportViewerPage);

export default withConfig(ConnectedReportViewerPage);
