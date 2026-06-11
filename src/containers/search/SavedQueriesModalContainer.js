import { connect } from 'react-redux';
import SavedQueriesModal from '../../components/search/SavedQueriesModal';

import {
  deleteSavedSearchQuery,
} from '../../actions/prefs';

import {
  getSavedSearchQueries,
} from '../../reducers';

const mapStateToProps = (state) => ({
  savedQueries: getSavedSearchQueries(state),
});

const mapDispatchToProps = {
  deleteQuery: deleteSavedSearchQuery,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SavedQueriesModal);
