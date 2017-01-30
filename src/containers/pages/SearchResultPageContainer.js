import { connect } from 'react-redux';
import SearchResultPage from '../../components/pages/SearchResultPage';
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
  setPreferredPageSize: setSearchPageSize,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultPage);
