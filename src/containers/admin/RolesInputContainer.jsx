import { connect } from 'react-redux';
import RolesInput from '../../components/admin/RolesInput';

import {
  readRoles,
} from '../../actions/auth';

import {
  getAuthRoles,
} from '../../reducers';

const mapStateToProps = state => ({
  roles: getAuthRoles(state),
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
