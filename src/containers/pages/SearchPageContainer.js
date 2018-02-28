import { connect } from 'react-redux';
import SearchPage from '../../components/pages/SearchPage';
import withConfig from '../../enhancers/withConfig';

import {
  setSearchPageAdvanced,
  setSearchPageKeyword,
  initiateSearch,
} from '../../actions/searchPage';

import {
  setSearchPageRecordType,
  setSearchPageVocabulary,
} from '../../actions/prefs';

import {
  getAdvancedSearchBooleanOp,
  getSearchPageAdvanced,
  getSearchPageKeyword,
  getSearchPageRecordType,
  getSearchPageVocabulary,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state) => {
  const recordType = getSearchPageRecordType(state);

  return {
    keywordValue: getSearchPageKeyword(state),
    recordTypeValue: recordType,
    vocabularyValue: getSearchPageVocabulary(state, recordType),
    advancedSearchCondition: getSearchPageAdvanced(state),
    perms: getUserPerms(state),
    preferredAdvancedSearchBooleanOp: getAdvancedSearchBooleanOp(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAdvancedSearchConditionCommit: (value) => {
    dispatch(setSearchPageAdvanced(value));
  },
  onKeywordCommit: (value) => {
    dispatch(setSearchPageKeyword(value));
  },
  onRecordTypeCommit: (value) => {
    dispatch(setSearchPageRecordType(value));
  },
  onVocabularyCommit: (value) => {
    dispatch(setSearchPageVocabulary(value));
  },
  onSearch: () => {
    dispatch(initiateSearch(ownProps.config, ownProps.history.push));
  },
});

export const ConnectedSearchPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);

export default withConfig(ConnectedSearchPage);
