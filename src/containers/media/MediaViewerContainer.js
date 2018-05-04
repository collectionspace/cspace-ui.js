import { connect } from 'react-redux';
import MediaViewer from '../../components/media/MediaViewer';

import {
  readRecord,
} from '../../actions/record';

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

const mapDispatchToProps = {
  readRecord,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MediaViewer);
