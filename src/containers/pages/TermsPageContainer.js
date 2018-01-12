import { connect } from 'react-redux';
import TermsPage from '../../components/pages/TermsPage';

import {
  setAdminTab,
} from '../../actions/prefs';

import {
  getUserPerms,
} from '../../reducers';

const mapStateToProps = state => ({
  perms: getUserPerms(state),
});

const mapDispatchToProps = {
  setAdminTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TermsPage);
