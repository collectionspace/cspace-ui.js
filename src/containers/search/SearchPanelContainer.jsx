import { connect } from 'react-redux';
import merge from 'lodash/merge';
import SearchPanel from '../../components/search/SearchPanel';
import { search } from '../../actions/search';
import { setSearchPanelPageSize } from '../../actions/prefs';

import {
  getSearchPanelPageSize,
  getSearchResult,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    name,
    recordType,
    searchDescriptor: providedSearchDescriptor,
  } = ownProps;

  const preferredPageSize = getSearchPanelPageSize(state, recordType, name);

  let searchDescriptor;

  if (
    preferredPageSize &&
    preferredPageSize !== providedSearchDescriptor.searchQuery.size &&
    !providedSearchDescriptor.searchQuery.p
  ) {
    // A preferred page size exists. Override the provded page size.

    searchDescriptor = merge({}, providedSearchDescriptor, {
      searchQuery: {
        size: preferredPageSize,
      },
    });
  } else {
    searchDescriptor = providedSearchDescriptor;
  }

  return {
    searchDescriptor,
    searchResult: getSearchResult(state, name, searchDescriptor),
  };
};

const mapDispatchToProps = ({
  search,
  setPreferredPageSize: setSearchPanelPageSize,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPanel);
