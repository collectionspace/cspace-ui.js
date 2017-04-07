import { connect } from 'react-redux';
import SearchResultPage from '../../components/pages/SearchResultPage';
import { setSearchPageAdvanced, setSearchPageKeyword } from '../../actions/searchPage';
import { search } from '../../actions/search';
import { setSearchResultPagePageSize } from '../../actions/prefs';

import {
  getSearchResultPagePageSize,
} from '../../reducers';

const mapStateToProps = state => ({
  preferredPageSize: getSearchResultPagePageSize(state),
});

const mapDispatchToProps = {
  search,
  setSearchPageAdvanced,
  setSearchPageKeyword,
  setPreferredPageSize: setSearchResultPagePageSize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultPage);
