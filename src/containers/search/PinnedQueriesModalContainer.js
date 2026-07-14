import { connect } from 'react-redux';
import PinnedQueriesModal from '../../components/search/PinnedQueriesModal';

import {
  deletePinnedQuery,
} from '../../actions/prefs';

import {
  getPinnedQueries,
} from '../../reducers';

const mapStateToProps = (state) => ({
  pinnedQueries: getPinnedQueries(state),
});

const mapDispatchToProps = {
  deleteQuery: deletePinnedQuery,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PinnedQueriesModal);
