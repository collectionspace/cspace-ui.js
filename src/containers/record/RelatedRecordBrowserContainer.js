import { connect } from 'react-redux';
import RelatedRecordBrowser from '../../components/record/RelatedRecordBrowser';

import {
  deselectItem,
} from '../../actions/search';

const mapDispatchToProps = {
  deselectItem,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(RelatedRecordBrowser);
