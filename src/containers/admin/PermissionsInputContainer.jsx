import { connect } from 'react-redux';
import PermissionsInput from '../../components/admin/PermissionsInput';

import {
  readPerms,
} from '../../actions/authz';

import {
  getAuthzResourceNames,
} from '../../reducers';

const mapStateToProps = state => ({
  resourceNames: getAuthzResourceNames(state),
});

const mapDispatchToProps = {
  readPerms,
};

const ConnectedPermissionsInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PermissionsInput);

ConnectedPermissionsInput.propTypes = PermissionsInput.propTypes;

export default ConnectedPermissionsInput;
