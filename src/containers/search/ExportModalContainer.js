import { connect } from 'react-redux';
import ExportModal from '../../components/search/ExportModal';

import {
  openExport,
} from '../../actions/export';

const mapDispatchToProps = {
  openExport,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(ExportModal);
