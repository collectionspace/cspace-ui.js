import { connect } from 'react-redux';
import get from 'lodash/get';
import VocabularyPage from '../../components/pages/VocabularyPage';

import {
  setAdminTab,
} from '../../actions/prefs';

import {
  readVocabularyItemRefs,
} from '../../actions/vocabulary';

import {
  getRecordData,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    match,
  } = ownProps;

  const csid = get(match, ['params', 'csid']);
  const data = (csid && csid !== 'new') ? getRecordData(state, csid) : undefined;

  return {
    data,
    perms: getUserPerms(state),
  };
};

const mapDispatchToProps = {
  readVocabularyItemRefs,
  setAdminTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VocabularyPage);
