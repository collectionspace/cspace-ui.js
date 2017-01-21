import { connect } from 'react-redux';
import SearchPanel from '../../components/search/SearchPanel';
import { search } from '../../actions/search';

import {
  getSearchResult,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    searchName,
    searchDescriptor,
  } = ownProps;

  return {
    searchResult: getSearchResult(state, searchName, searchDescriptor),
  };
};

const mapDispatchToProps = {
  search,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPanel);
