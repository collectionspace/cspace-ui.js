import { connect } from 'react-redux';
import SearchResultPage from '../../components/pages/SearchResultPage';
import { search } from '../../actions/search';

const mapDispatchToProps = {
  search,
};

export default connect(
  null,
  mapDispatchToProps
)(SearchResultPage);
