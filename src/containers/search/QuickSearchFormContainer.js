import { connect } from 'react-redux';
import QuickSearchForm from '../../components/search/QuickSearchForm';

import {
  setQuickSearchKeyword,
  initiateSearch,
} from '../../actions/quickSearch';

import {
  setQuickSearchRecordType,
  setQuickSearchVocabulary,
} from '../../actions/prefs';

import {
  getAuthorityVocabCsid,
  getQuickSearchKeyword,
  getQuickSearchRecordType,
  getQuickSearchVocabulary,
} from '../../reducers';

const mapStateToProps = (state) => {
  const quickSearchRecordType = getQuickSearchRecordType(state);

  return {
    keywordValue: getQuickSearchKeyword(state),
    recordTypeValue: quickSearchRecordType,
    vocabularyValue: getQuickSearchVocabulary(state, quickSearchRecordType),
    getAuthorityVocabCsid: (recordType, vocabulary) => getAuthorityVocabCsid(
      state, recordType, vocabulary,
    ),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onKeywordCommit: (value) => {
    dispatch(setQuickSearchKeyword(value));
  },
  onRecordTypeCommit: (value) => {
    dispatch(setQuickSearchRecordType(value));
  },
  onVocabularyCommit: (value) => {
    dispatch(setQuickSearchVocabulary(value));
  },
  search: () => {
    dispatch(initiateSearch(ownProps.history.push));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuickSearchForm);
