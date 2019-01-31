import { connect } from 'react-redux';
import get from 'lodash/get';
import { getBatchName, getReportName } from '../../helpers/invocationHelpers';

import {
  createNewRecord,
} from '../../actions/record';

import {
  getRecordData,
} from '../../reducers';

import InvocationEditor from '../../components/invocable/InvocationEditor';

const mapStateToProps = state => ({
  data: getRecordData(state, ''),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    invocationItem,
    type,
  } = ownProps;

  return {
    createNewRecord: () => {
      const invocableName = (type === 'report')
        ? getReportName(invocationItem)
        : getBatchName(invocationItem);

      const recordTypeConfig = get(config, ['invocables', type, invocableName]);

      if (recordTypeConfig) {
        return dispatch(createNewRecord(config, recordTypeConfig));
      }

      return undefined;
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvocationEditor);
