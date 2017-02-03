import { connect } from 'react-redux';
import SearchResultPage from '../../components/pages/SearchResultPage';
import { setAdvancedSearchKeyword } from '../../actions/advancedSearch';
import { search } from '../../actions/search';
import { setSearchPageSize } from '../../actions/prefs';

import {
  getSearchPageSize,
} from '../../reducers';

const mapStateToProps = state => ({
  preferredPageSize: getSearchPageSize(state),
});

const mapDispatchToProps = {
  search,
  setAdvancedSearchKeyword,
  setPreferredPageSize: setSearchPageSize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultPage);
