import { connect } from 'react-redux';
import VocabularyUsedByPanel from '../../components/admin/VocabularyUsedByPanel';

import {
  getRecordData,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    csid,
  } = ownProps;

  return {
    data: getRecordData(state, csid),
  };
};

export default connect(
  mapStateToProps,
)(VocabularyUsedByPanel);
