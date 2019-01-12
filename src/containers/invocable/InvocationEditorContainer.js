import { connect } from 'react-redux';
import get from 'lodash/get';

import {
  createNewRecord,
} from '../../actions/record';

import InvocationEditor from '../../components/invocable/InvocationEditor';

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    // invocationItem,
    type,
  } = ownProps;

  const invocableName = 'coreAcquisition'; // TODO: invocationItem.get('filename');
  const recordTypeConfig = get(config, ['invocables', type, invocableName]);

  return {
    createNewRecord: () => {
      dispatch(createNewRecord(config, recordTypeConfig));
    },
  };
};

export default connect(
  undefined,
  mapDispatchToProps
)(InvocationEditor);
