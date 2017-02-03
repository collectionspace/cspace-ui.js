import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import SearchPage from '../../components/pages/SearchPage';

import {
  setAdvancedSearchKeyword,
  initiateSearch,
} from '../../actions/advancedSearch';

import {
  setAdvancedSearchRecordType,
  setAdvancedSearchVocabulary,
} from '../../actions/prefs';

import {
  getAdvancedSearchKeyword,
  getAdvancedSearchRecordType,
  getAdvancedSearchVocabulary,
} from '../../reducers';

const mapStateToProps = (state) => {
  const recordType = getAdvancedSearchRecordType(state);

  return {
    keywordValue: getAdvancedSearchKeyword(state),
    preferredRecordType: recordType,
    preferredVocabulary: getAdvancedSearchVocabulary(state, recordType),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onKeywordCommit: (value) => {
    dispatch(setAdvancedSearchKeyword(value));
  },
  onRecordTypeCommit: (value) => {
    dispatch(setAdvancedSearchRecordType(value));
  },
  onVocabularyCommit: (value) => {
    dispatch(setAdvancedSearchVocabulary(value));
  },
  onSearch: () => {
    dispatch(initiateSearch(ownProps.router.push));
  },
});

export const ConnectedSearchPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);

export default injectIntl(withRouter(ConnectedSearchPage));
