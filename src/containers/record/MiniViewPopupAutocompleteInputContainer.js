import { connect } from 'react-redux';
import MiniViewPopupAutocompleteInput from '../../components/record/MiniViewPopupAutocompleteInput';

import {
  clearRecord,
} from '../../actions/record';

import {
  getUserPerms,
} from '../../reducers';

const mapStateToProps = state => ({
  perms: getUserPerms(state),
});

const mapDispatchToProps = {
  clearRecord,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MiniViewPopupAutocompleteInput);
