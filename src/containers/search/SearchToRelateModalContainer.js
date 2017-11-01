import { connect } from 'react-redux';
import SearchToRelateModal, { searchName } from '../../components/search/SearchToRelateModal';

import {
  setSearchToRelatePageSize,
} from '../../actions/prefs';

import {
  batchCreateBidirectional,
} from '../../actions/relation';

import {
  setSearchToRelateAdvanced,
  setSearchToRelateKeyword,
  setSearchToRelateRecordType,
  setSearchToRelateVocabulary,
} from '../../actions/searchToRelate';

import {
  clearSearchResults,
  search,
  setAllResultItemsSelected,
  setResultItemSelected,
} from '../../actions/search';

import {
  getSearchToRelateAdvanced,
  getSearchToRelateKeyword,
  getSearchToRelateRecordType,
  getSearchToRelateVocabulary,
  getSearchToRelatePageSize,
  getSearchSelectedItems,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state) => {
  const recordType = getSearchToRelateRecordType(state);

  return {
    keywordValue: getSearchToRelateKeyword(state),
    recordTypeValue: recordType,
    vocabularyValue: getSearchToRelateVocabulary(state, recordType),
    advancedSearchCondition: getSearchToRelateAdvanced(state),
    perms: getUserPerms(state),
    preferredPageSize: getSearchToRelatePageSize(state),
    selectedItems: getSearchSelectedItems(state, searchName),
  };
};

const mapDispatchToProps = {
  clearSearchResults,
  search,
  onAdvancedSearchConditionCommit: setSearchToRelateAdvanced,
  onKeywordCommit: setSearchToRelateKeyword,
  onRecordTypeCommit: setSearchToRelateRecordType,
  onVocabularyCommit: setSearchToRelateVocabulary,
  onItemSelectChange: setResultItemSelected,
  createRelations: batchCreateBidirectional,
  setAllItemsSelected: setAllResultItemsSelected,
  setPreferredPageSize: setSearchToRelatePageSize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchToRelateModal);
