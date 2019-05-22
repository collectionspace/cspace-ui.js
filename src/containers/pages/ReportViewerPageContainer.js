import { connect } from 'react-redux';
import qs from 'qs';
import ReportViewerPage from '../../components/pages/ReportViewerPage';
import withConfig from '../../enhancers/withConfig';

import {
  invoke,
} from '../../actions/report';

const mapDispatchToProps = (dispatch, ownProps) => ({
  readContent: (location, match) => {
    const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true });

    const {
      params: paramsJson,
      ...invocationDescriptor
    } = queryParams;

    const params = paramsJson && JSON.parse(paramsJson);

    return dispatch(invoke(ownProps.config, match.params.reportCsid, invocationDescriptor, params));
  },
});

export const ConnectedReportViewerPage = connect(
  undefined,
  mapDispatchToProps,
)(ReportViewerPage);

export default withConfig(ConnectedReportViewerPage);
