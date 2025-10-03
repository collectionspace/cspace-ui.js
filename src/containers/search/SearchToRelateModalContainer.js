import { connect } from 'react-redux';
import SearchToRelateModal from '../../components/search/SearchToRelateModal';

import {
  batchCreateBidirectional,
} from '../../actions/relation';

import {
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state) => ({
  perms: getUserPerms(state),
});

const mapDispatchToProps = {
  createRelations: batchCreateBidirectional,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchToRelateModal);
