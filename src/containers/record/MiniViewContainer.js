import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';
import MiniView from '../../components/record/MiniView';

import {
  getRecordData,
} from '../../reducers';

import {
  readRecord,
} from '../../actions/record';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  const data = getRecordData(state, csid);

  return {
    data,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    csid,
    recordType,
    vocabulary,
  } = ownProps;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);

  const vocabularyConfig = vocabulary
    ? get(recordTypeConfig, ['vocabularies', vocabulary])
    : undefined;

  return {
    readRecord: () => {
      dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid));
    },
  };
};

export const ConnectedMiniView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MiniView);

const InitializedConnectedMiniView = injectIntl(ConnectedMiniView);

export default InitializedConnectedMiniView;
