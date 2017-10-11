import { connect } from 'react-redux';
import ContentViewerPage from '../../components/pages/ContentViewerPage';

import {
  readBinary,
} from '../../actions/media';

const mapDispatchToProps = {
  readContent: readBinary,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(ContentViewerPage);
