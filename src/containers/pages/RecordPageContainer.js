import { connect } from 'react-redux';

import {
  readRecord,
} from '../../actions/record';

import RecordPage from '../../components/pages/RecordPage';

const mapDispatchToProps = {
  readRecord,
};

export default connect(
  null,
  mapDispatchToProps
)(RecordPage);
