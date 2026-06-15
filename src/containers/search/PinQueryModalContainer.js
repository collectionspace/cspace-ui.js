import { connect } from 'react-redux';
import PinQueryModal from '../../components/search/PinQueryModal';

import {
  pinQuery,
} from '../../actions/prefs';

const mapDispatchToProps = {
  pinQuery,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(PinQueryModal);
