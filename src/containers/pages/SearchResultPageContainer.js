import { connect } from 'react-redux';
import SearchResultPage from '../../components/pages/SearchResultPage';
import { setSearchPageAdvanced, setSearchPageKeyword } from '../../actions/searchPage';
import { setSearchResultPagePageSize } from '../../actions/prefs';
import { SEARCH_RESULT_PAGE_SEARCH_NAME } from '../../constants/searchNames';

import {
  search,
  setResultItemSelected,
  setAllResultItemsSelected,
} from '../../actions/search';

import {
  getSearchResultPagePageSize,
  getSearchSelectedItems,
  getUserPerms,
  isSearchResultSidebarOpen,
} from '../../reducers';

const mapStateToProps = state => ({
  isSidebarOpen: isSearchResultSidebarOpen(state),
  perms: getUserPerms(state),
  preferredPageSize: getSearchResultPagePageSize(state),
  selectedItems: getSearchSelectedItems(state, SEARCH_RESULT_PAGE_SEARCH_NAME),
});

const mapDispatchToProps = {
  search,
  setSearchPageAdvanced,
  setSearchPageKeyword,
  setPreferredPageSize: setSearchResultPagePageSize,
  setAllItemsSelected: setAllResultItemsSelected,
  onItemSelectChange: setResultItemSelected,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultPage);
