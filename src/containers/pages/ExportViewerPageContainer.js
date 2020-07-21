import { connect } from 'react-redux';
import Immutable from 'immutable';
import qs from 'qs';
import ExportViewerPage from '../../components/pages/ExportViewerPage';
import withConfig from '../../enhancers/withConfig';

import {
  invoke,
} from '../../actions/export';

const mapDispatchToProps = (dispatch, ownProps) => ({
  readContent: (location) => {
    const invocationDescriptorObject = qs.parse(location.search, { ignoreQueryPrefix: true });
    const invocationDescriptor = Immutable.fromJS(invocationDescriptorObject);

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
