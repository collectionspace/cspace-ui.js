import { connect } from 'react-redux';
import SearchResultBatchPanel from '../../components/search/SearchResultBatchPanel';

import {
  invoke,
} from '../../actions/batch';

import {
  getUserPerms,
} from '../../reducers';

const mapStateToProps = state => ({
  perms: getUserPerms(state),
});

const mapDispatchToProps = {
  invoke,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultBatchPanel);
