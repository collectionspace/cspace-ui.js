import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import KeywordSearch from '../../components/search/KeywordSearch';

import {
  setKeywordSearchKeyword,
  setKeywordSearchRecordType,
  setKeywordSearchVocabulary,
  initiateSearch,
} from '../../actions/keywordSearch';

import {
  getKeywordSearchKeyword,
  getKeywordSearchRecordType,
  getKeywordSearchVocabulary,
} from '../../reducers';

const mapStateToProps = state => ({
  keywordValue: getKeywordSearchKeyword(state),
  recordTypeValue: getKeywordSearchRecordType(state),
  vocabularyValue: getKeywordSearchVocabulary(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onKeywordCommit: (value) => {
    dispatch(setKeywordSearchKeyword(value));
  },
  onRecordTypeCommit: (value) => {
    dispatch(setKeywordSearchRecordType(value));
  },
  onVocabularyCommit: (value) => {
    dispatch(setKeywordSearchVocabulary(value));
  },
  onSearch: () => {
    dispatch(initiateSearch(ownProps.router.push));
  },
});

export const ConnectedKeywordSearch = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeywordSearch);

export default withRouter(ConnectedKeywordSearch);
