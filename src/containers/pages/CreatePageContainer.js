import { connect } from 'react-redux';
import CreatePage from '../../components/pages/CreatePage';

import {
  getAuthorityVocabWorkflowState,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state) => ({
  perms: getUserPerms(state),
  getAuthorityVocabWorkflowState: (recordType, vocabulary) => getAuthorityVocabWorkflowState(
    state, recordType, vocabulary,
  ),
});

export default connect(
  mapStateToProps,
)(CreatePage);
