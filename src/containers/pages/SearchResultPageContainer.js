import { connect } from 'react-redux';
import SearchResultPage, { searchName } from '../../components/pages/SearchResultPage';
import { setSearchPageAdvanced, setSearchPageKeyword } from '../../actions/searchPage';
import { setSearchResultPagePageSize } from '../../actions/prefs';

import {
  search,
  setResultItemSelected,
} from '../../actions/search';

import {
  getSearchResultPagePageSize,
  getSearchSelectedItems,
} from '../../reducers';

const mapStateToProps = state => ({
  preferredPageSize: getSearchResultPagePageSize(state),
  selectedItems: getSearchSelectedItems(state, searchName),
});

const mapDispatchToProps = {
  search,
  setSearchPageAdvanced,
  setSearchPageKeyword,
  setPreferredPageSize: setSearchResultPagePageSize,
  onItemSelectChange: setResultItemSelected,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultPage);
