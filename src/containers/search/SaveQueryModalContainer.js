import { connect } from 'react-redux';
import SaveQueryModal from '../../components/search/SaveQueryModal';

import {
  saveSearchQuery,
} from '../../actions/prefs';

const mapDispatchToProps = {
  saveQuery: saveSearchQuery,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(SaveQueryModal);
