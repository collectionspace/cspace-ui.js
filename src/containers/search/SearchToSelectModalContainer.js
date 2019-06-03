import { connect } from 'react-redux';
import get from 'lodash/get';
import SearchToSelectModal, { searchName } from '../../components/search/SearchToSelectModal';

import {
  setSearchToSelectPageSize,
} from '../../actions/prefs';

import {
  clearSearchToSelect,
  setSearchToSelectAdvanced,
  setSearchToSelectKeyword,
  setSearchToSelectRecordType,
  setSearchToSelectVocabulary,
} from '../../actions/searchToSelect';

import {
  clearSearchResults,
  search,
  setAllResultItemsSelected,
  setResultItemSelected,
} from '../../actions/search';

import {
  getAdvancedSearchBooleanOp,
  getAuthorityVocabCsid,
  getSearchToSelectAdvanced,
  getSearchToSelectKeyword,
  getSearchToSelectRecordType,
  getSearchToSelectVocabulary,
  getSearchToSelectPageSize,
  getSearchSelectedItems,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const searchToSelectRecordType = getSearchToSelectRecordType(state);

  return {
    keywordValue: getSearchToSelectKeyword(state),
    recordTypeValue: searchToSelectRecordType,
    vocabularyValue: getSearchToSelectVocabulary(state, searchToSelectRecordType),
    advancedSearchCondition: getSearchToSelectAdvanced(state),
    perms: getUserPerms(state),
    preferredAdvancedSearchBooleanOp:
      getAdvancedSearchBooleanOp(state) ||
      get(ownProps, ['config', 'defaultAdvancedSearchBooleanOp']),
    preferredPageSize: getSearchToSelectPageSize(state),
    selectedItems: getSearchSelectedItems(state, searchName),
    getAuthorityVocabCsid: (recordType, vocabulary) =>
      getAuthorityVocabCsid(state, recordType, vocabulary),
  };
};

const mapDispatchToProps = {
  clearSearchResults,
  search,
  onAdvancedSearchConditionCommit: setSearchToSelectAdvanced,
  onClearButtonClick: clearSearchToSelect,
  onKeywordCommit: setSearchToSelectKeyword,
  onRecordTypeCommit: setSearchToSelectRecordType,
  onVocabularyCommit: setSearchToSelectVocabulary,
  onItemSelectChange: setResultItemSelected,
  setAllItemsSelected: setAllResultItemsSelected,
  setPreferredPageSize: setSearchToSelectPageSize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchToSelectModal);
