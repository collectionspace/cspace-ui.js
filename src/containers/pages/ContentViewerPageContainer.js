import { connect } from 'react-redux';
import get from 'lodash/get';
import ContentViewerPage from '../../components/pages/ContentViewerPage';

import {
  readBinary,
} from '../../actions/media';

const mapDispatchToProps = {
  readContent: (location, match) => {
    const contentPath = get(match, ['params', 'contentPath']);

    return readBinary(contentPath);
  },
};

export default connect(
  undefined,
  mapDispatchToProps,
)(ContentViewerPage);
