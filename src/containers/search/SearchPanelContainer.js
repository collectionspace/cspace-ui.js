import { connect } from 'react-redux';
import SearchPanel from '../../components/search/SearchPanel';
import { search } from '../../actions/search';
import { setSearchPanelPageSize } from '../../actions/prefs';

import {
  getSearchPanelPageSize,
  getSearchError,
  getSearchResult,
  isSearchPending,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    name,
    recordType,
    searchDescriptor: providedSearchDescriptor,
  } = ownProps;

  const preferredPageSize = getSearchPanelPageSize(state, recordType, name);
  const providedSearchQuery = providedSearchDescriptor.get('searchQuery');

  let searchDescriptor;

  if (
    preferredPageSize
    && preferredPageSize !== providedSearchQuery.get('size')
    && !providedSearchQuery.get('p')
  ) {
    // A preferred page size exists. Override the provided page size.

    searchDescriptor = providedSearchDescriptor.set(
      'searchQuery', providedSearchQuery.set('size', preferredPageSize),
    );
  } else {
    searchDescriptor = providedSearchDescriptor;
  }

  return {
    searchDescriptor,
    searchError: getSearchError(state, name, searchDescriptor),
    searchResult: getSearchResult(state, name, searchDescriptor),
    searchIsPending: isSearchPending(state, name, searchDescriptor),
  };
};

const mapDispatchToProps = ({
  search,
  setPreferredPageSize: setSearchPanelPageSize,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPanel);
