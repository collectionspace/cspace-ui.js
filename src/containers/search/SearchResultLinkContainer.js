import { connect } from 'react-redux';
import SearchResultLink from '../../components/search/SearchResultLink';
import { search } from '../../actions/search';

import {
  isSearchPending,
  getSearchResult,
  getSearchError,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    searchDescriptor,
    searchName,
  } = ownProps;

  return {
    isSearchPending: isSearchPending(state, searchName, searchDescriptor),
    searchResult: getSearchResult(state, searchName, searchDescriptor),
    searchError: getSearchError(state, searchName, searchDescriptor),
  };
};

const mapDispatchToProps = {
  search,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultLink);
