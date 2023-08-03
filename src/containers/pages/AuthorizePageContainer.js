import { connect } from 'react-redux';
import AuthorizePage from '../../components/pages/AuthorizePage';

import {
  createAuthCodeUrl,
} from '../../actions/login';

const mapDispatchToProps = {
  createAuthCodeUrl,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(AuthorizePage);
