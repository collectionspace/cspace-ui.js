import { connect } from 'react-redux';
import WatchedSearchResultTable from '../../components/search/WatchedSearchResultTable';

import {
  getSearchResult,
  getSearchError,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    searchName,
    searchDescriptor,
  } = ownProps;

  return {
    searchResult: getSearchResult(state, searchName, searchDescriptor),
    searchError: getSearchError(state, searchName, searchDescriptor),
  };
};

export default connect(
  mapStateToProps,
)(WatchedSearchResultTable);
