import { connect } from 'react-redux';
import CreatePage from '../../components/pages/CreatePage';

import {
  getAuthorityVocabWorkflowState,
  getUserPerms,
  getTagsForRecord,
} from '../../reducers';

const mapStateToProps = (state) => ({
  perms: getUserPerms(state),
  getAuthorityVocabWorkflowState: (recordType, vocabulary) => getAuthorityVocabWorkflowState(
    state, recordType, vocabulary,
  ),
  getTagsForRecord: (recordType) => getTagsForRecord(state, recordType),
});

export default connect(
  mapStateToProps,
)(CreatePage);
