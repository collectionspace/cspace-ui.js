import { connect } from 'react-redux';
import SearchResultTraverser from '../../components/search/SearchResultTraverser';

import {
  getNextPageSearchDescriptor,
  getPreviousPageSearchDescriptor,
} from '../../helpers/searchHelpers';

import {
  search,
} from '../../actions/search';

import {
  getSearchState,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    searchName,
    searchDescriptor,
  } = ownProps;

  const nextPageSearchDescriptor = getNextPageSearchDescriptor(searchDescriptor);
  const prevPageSearchDescriptor = getPreviousPageSearchDescriptor(searchDescriptor);

  return {
    nextPageSearchDescriptor,
    prevPageSearchDescriptor,
    searchState: getSearchState(state, searchName, searchDescriptor),
    nextPageSearchState: getSearchState(state, searchName, nextPageSearchDescriptor),
    prevPageSearchState: prevPageSearchDescriptor
      ? getSearchState(state, searchName, prevPageSearchDescriptor)
      : undefined,
  };
};

const mapDispatchToProps = {
  search,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultTraverser);
