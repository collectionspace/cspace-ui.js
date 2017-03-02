import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
  getQuickSearchKeyword,
  getQuickSearchRecordType,
  getQuickSearchVocabulary,
} from '../../reducers';

const mapStateToProps = (state) => {
  const recordType = getQuickSearchRecordType(state);

  return {
    keywordValue: getQuickSearchKeyword(state),
    recordTypeValue: recordType,
    vocabularyValue: getQuickSearchVocabulary(state, recordType),
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
  onSearch: () => {
    dispatch(initiateSearch(ownProps.router.push));
  },
});

export const ConnectedQuickSearchForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuickSearchForm);

export default withRouter(ConnectedQuickSearchForm);
