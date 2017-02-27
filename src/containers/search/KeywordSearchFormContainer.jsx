import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import KeywordSearchForm from '../../components/search/KeywordSearchForm';

import {
  setKeywordSearchKeyword,
  initiateSearch,
} from '../../actions/keywordSearch';

import {
  setKeywordSearchRecordType,
  setKeywordSearchVocabulary,
} from '../../actions/prefs';

import {
  getKeywordSearchKeyword,
  getKeywordSearchRecordType,
  getKeywordSearchVocabulary,
} from '../../reducers';

const mapStateToProps = (state) => {
  const recordType = getKeywordSearchRecordType(state);

  return {
    keywordValue: getKeywordSearchKeyword(state),
    recordTypeValue: recordType,
    vocabularyValue: getKeywordSearchVocabulary(state, recordType),
  };
};

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

export const ConnectedKeywordSearchForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeywordSearchForm);

export default withRouter(ConnectedKeywordSearchForm);
