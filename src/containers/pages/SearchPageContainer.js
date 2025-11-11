import { connect } from 'react-redux';
import get from 'lodash/get';
import SearchPage from '../../components/pages/SearchPage';
import withConfig from '../../enhancers/withConfig';

import {
  buildRecordFieldOptionLists,
  deleteOptionList,
} from '../../actions/optionList';

import {
  clearSearchPage,
  setSearchPageAdvanced,
  setSearchPageKeyword,
  initiateSearch,
  setSearchPageAdvancedLimitBy,
  setSearchPageAdvancedSearchTerms,
} from '../../actions/searchPage';

import {
  setSearchPageRecordType,
  setSearchPageVocabulary,
  toggleUseNewSearch,
} from '../../actions/prefs';

import {
  getAdvancedSearchBooleanOp,
  getAuthorityVocabCsid,
  getSearchPageAdvanced,
  getSearchPageAdvancedLimitBy,
  getSearchPageAdvancedSearchTerms,
  getSearchPageKeyword,
  getSearchPageRecordType,
  getSearchPageVocabulary,
  getUseNewSearch,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const searchPageRecordType = getSearchPageRecordType(state);

  return {
    useNewSearch: getUseNewSearch(state),
    keywordValue: getSearchPageKeyword(state),
    recordTypeValue: searchPageRecordType,
    vocabularyValue: getSearchPageVocabulary(state, searchPageRecordType),
    advancedSearchCondition: getSearchPageAdvanced(state),
    advancedSearchConditionLimitBy: getSearchPageAdvancedLimitBy(state),
    advancedSearchConditionSearchTerms: getSearchPageAdvancedSearchTerms(state),
    perms: getUserPerms(state),
    preferredAdvancedSearchBooleanOp:
      getAdvancedSearchBooleanOp(state)
      || get(ownProps, ['config', 'defaultAdvancedSearchBooleanOp']),
    getAuthorityVocabCsid: (recordType, vocabulary) => getAuthorityVocabCsid(
      state, recordType, vocabulary,
    ),
  };
};

const mapDispatchToProps = {
  buildRecordFieldOptionLists,
  clearSearchPage,
  deleteOptionList,
  initiateSearch,
  toggleUseNewSearch,
  onAdvancedSearchConditionCommit: setSearchPageAdvanced,
  onAdvancedSearchConditionLimitByCommit: setSearchPageAdvancedLimitBy,
  onAdvancedSearchConditionSearchTermsCommit: setSearchPageAdvancedSearchTerms,
  onClearButtonClick: clearSearchPage,
  onKeywordCommit: setSearchPageKeyword,
  onRecordTypeCommit: setSearchPageRecordType,
  onVocabularyCommit: setSearchPageVocabulary,
};

export const ConnectedSearchPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);

export default withConfig(ConnectedSearchPage);
