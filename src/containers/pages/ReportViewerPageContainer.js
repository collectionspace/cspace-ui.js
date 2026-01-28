import { connect } from 'react-redux';
import ReportViewerPage from '../../components/pages/ReportViewerPage';
import withConfig from '../../enhancers/withConfig';

import {
  invoke,
} from '../../actions/report';
import { loadReportInvocation } from '../../helpers/invocationHelpers';

const mapDispatchToProps = (dispatch, ownProps) => ({
  readContent: () => {
    const loaded = loadReportInvocation(true);

    if (!loaded) return Promise.reject();

    const { invocationDescriptor, params } = loaded;

    return dispatch(
      invoke(ownProps.config, ownProps.match.params.reportCsid, invocationDescriptor, params),
    );
  },
});

export const ConnectedReportViewerPage = connect(
  undefined,
  mapDispatchToProps,
)(ReportViewerPage);

export default withConfig(ConnectedReportViewerPage);
