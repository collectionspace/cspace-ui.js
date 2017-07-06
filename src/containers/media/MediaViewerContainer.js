import { connect } from 'react-redux';
import MediaViewer from '../../components/media/MediaViewer';

import {
  isSearchPending,
  getSearchResult,
  getSearchError,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    searchName,
    searchDescriptor,
  } = ownProps;

  return {
    isSearchPending: isSearchPending(state, searchName, searchDescriptor),
    searchResult: getSearchResult(state, searchName, searchDescriptor),
    searchError: getSearchError(state, searchName, searchDescriptor),
  };
};

export default connect(
  mapStateToProps,
)(MediaViewer);
