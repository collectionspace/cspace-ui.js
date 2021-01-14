import { connect } from 'react-redux';
import ExportViewerPage from '../../components/pages/ExportViewerPage';
import withConfig from '../../enhancers/withConfig';

import {
  invoke,
} from '../../actions/export';

import {
  loadInvocationDescriptor,
} from '../../helpers/invocationHelpers';

const mapDispatchToProps = (dispatch, ownProps) => ({
  readContent: () => {
    // const invocationDescriptorObject = qs.parse(location.search, { ignoreQueryPrefix: true });
    // const invocationDescriptor = Immutable.fromJS(invocationDescriptorObject);

    const invocationDescriptor = loadInvocationDescriptor(true);

    return dispatch(
      invoke(ownProps.config, invocationDescriptor),
    );
  },
});

export const ConnectedExportViewerPage = connect(
  undefined,
  mapDispatchToProps,
)(ExportViewerPage);

export default withConfig(ConnectedExportViewerPage);
