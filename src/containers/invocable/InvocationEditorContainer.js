import { connect } from 'react-redux';
import get from 'lodash/get';
import { createNewRecord } from '../../actions/record';
import { getRecordData } from '../../reducers';
import InvocationEditor from '../../components/invocable/InvocationEditor';

const mapStateToProps = state => ({
  paramData: getRecordData(state, ''),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    metadata,
    recordType,
  } = ownProps;

  return {
    createNewRecord: () => {
      const invocableNameGetter = get(config, ['recordTypes', recordType, 'invocableName']);
      const invocableName = invocableNameGetter && invocableNameGetter(metadata);

      const paramRecordTypeConfig = invocableName
        ? get(config, ['invocables', recordType, invocableName])
        : undefined;

      if (paramRecordTypeConfig) {
        return dispatch(createNewRecord(config, paramRecordTypeConfig));
      }

      return undefined;
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvocationEditor);
