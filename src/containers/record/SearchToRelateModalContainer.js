import { connect } from 'react-redux';
import SearchToRelateModal, { searchName } from '../../components/record/SearchToRelateModal';

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
  setResultItemSelected,
} from '../../actions/search';

import {
  getSearchToRelateAdvanced,
  getSearchToRelateKeyword,
  getSearchToRelateRecordType,
  getSearchToRelateVocabulary,
  getSearchToRelatePageSize,
  getSearchSelectedItems,
} from '../../reducers';

const mapStateToProps = (state) => {
  const recordType = getSearchToRelateRecordType(state);

  return {
    keywordValue: getSearchToRelateKeyword(state),
    recordTypeValue: recordType,
    vocabularyValue: getSearchToRelateVocabulary(state, recordType),
    advancedSearchCondition: getSearchToRelateAdvanced(state),
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
  setPreferredPageSize: setSearchToRelatePageSize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchToRelateModal);
