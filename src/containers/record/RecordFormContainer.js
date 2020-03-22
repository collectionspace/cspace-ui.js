import { connect } from 'react-redux';

import {
  addFieldInstance,
  moveFieldValue,
  setFieldValue,
  deleteFieldValue,
  sortFieldInstances,
} from '../../actions/record';

import RecordForm from '../../components/record/RecordForm';

const mapDispatchToProps = {
  onAddInstance: addFieldInstance,
  onCommit: setFieldValue,
  onMoveInstance: moveFieldValue,
  onRemoveInstance: deleteFieldValue,
  onSortInstances: sortFieldInstances,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(RecordForm);
