import { connect } from 'react-redux';
import RolesInput from '../../components/admin/RolesInput';

import {
  readRoles,
} from '../../actions/authz';

import {
  getAuthzRoles,
} from '../../reducers';

const mapStateToProps = state => ({
  roles: getAuthzRoles(state),
});

const mapDispatchToProps = {
  readRoles,
};

const ConnectedRolesInput = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RolesInput);

ConnectedRolesInput.propTypes = RolesInput.propTypes;

export default ConnectedRolesInput;
