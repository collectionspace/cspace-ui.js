import { connect } from 'react-redux';
import get from 'lodash/get';
import SearchPage from '../../components/pages/SearchPage';
import withConfig from '../../enhancers/withConfig';

import {
  clearSearchPage,
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
  getAuthorityVocabCsid,
  getSearchPageAdvanced,
  getSearchPageKeyword,
  getSearchPageRecordType,
  getSearchPageVocabulary,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const searchPageRecordType = getSearchPageRecordType(state);

  return {
    keywordValue: getSearchPageKeyword(state),
    recordTypeValue: searchPageRecordType,
    vocabularyValue: getSearchPageVocabulary(state, searchPageRecordType),
    advancedSearchCondition: getSearchPageAdvanced(state),
    perms: getUserPerms(state),
    preferredAdvancedSearchBooleanOp:
      getAdvancedSearchBooleanOp(state) ||
      get(ownProps, ['config', 'defaultAdvancedSearchBooleanOp']),
    getAuthorityVocabCsid: (recordType, vocabulary) =>
      getAuthorityVocabCsid(state, recordType, vocabulary),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAdvancedSearchConditionCommit: (value) => {
    dispatch(setSearchPageAdvanced(value));
  },
  onClearButtonClick: () => {
    dispatch(clearSearchPage());
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
