import { connect } from 'react-redux';

import {
  createNewRecord,
  readRecord,
} from '../../actions/record';

import RecordPage from '../../components/pages/RecordPage';

const mapDispatchToProps = {
  createNewRecord,
  readRecord,
};

export default connect(
  null,
  mapDispatchToProps
)(RecordPage);
