import { connect } from 'react-redux';
import SearchResultSidebarToggleButton from '../../components/search/SearchResultSidebarToggleButton';

import {
  toggleSearchResultSidebar,
} from '../../actions/prefs';

import {
  isSearchResultSidebarOpen,
} from '../../reducers';

const mapStateToProps = (state) => ({
  isSearchResultSidebarOpen: isSearchResultSidebarOpen(state),
});

const mapDispatchToProps = {
  toggleSearchResultSidebar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultSidebarToggleButton);
