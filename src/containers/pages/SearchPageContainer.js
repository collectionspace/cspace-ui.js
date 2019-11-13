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
      getAdvancedSearchBooleanOp(state)
      || get(ownProps, ['config', 'defaultAdvancedSearchBooleanOp']),
    getAuthorityVocabCsid: (recordType, vocabulary) =>
      getAuthorityVocabCsid(state, recordType, vocabulary),
  };
};

const mapDispatchToProps = {
  buildRecordFieldOptionLists,
  deleteOptionList,
  initiateSearch,
  onAdvancedSearchConditionCommit: setSearchPageAdvanced,
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
