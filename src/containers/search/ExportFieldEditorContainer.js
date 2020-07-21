import { connect } from 'react-redux';
import ExportFieldEditor from '../../components/search/ExportFieldEditor';

import {
  buildRecordFieldOptionLists,
  deleteOptionList,
} from '../../actions/optionList';

const mapDispatchToProps = {
  buildRecordFieldOptionLists,
  deleteOptionList,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(ExportFieldEditor);
