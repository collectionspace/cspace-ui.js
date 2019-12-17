import { connect } from 'react-redux';
import Immutable from 'immutable';
import { refNameToCsid } from '../../helpers/refNameHelpers';

import {
  removeNotification,
  showNotification,
} from '../../actions/notification';

import {
  readRecord,
} from '../../actions/record';

import {
  getRecordData,
} from '../../reducers';

import HierarchyReparentNotifier from '../../components/record/HierarchyReparentNotifier';

const mapStateToProps = (state, ownProps) => {
  const {
    childRefNames,
  } = ownProps;

  return {
    childData: Immutable.Map(
      childRefNames.map((refName) => [refName, getRecordData(state, refNameToCsid(refName))]),
    ),
  };
};

const mapDispatchToProps = {
  readRecord,
  removeNotification,
  showNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HierarchyReparentNotifier);
