import { connect } from 'react-redux';
import MediaViewerPanel from '../../components/media/MediaViewerPanel';
import { search } from '../../actions/search';

import {
  getSearchResult,
} from '../../reducers';

const mapStateToProps = (state, ownProps) => {
  const {
    name,
    searchDescriptor,
  } = ownProps;

  return {
    searchResult: getSearchResult(state, name, searchDescriptor),
  };
};

const mapDispatchToProps = ({
  search,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaViewerPanel);
