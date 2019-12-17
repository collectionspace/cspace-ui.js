import { connect } from 'react-redux';
import ReportPage from '../../components/pages/ReportPage';

import {
  closeModal,
  openModal,
} from '../../actions/notification';

import {
  setToolTab,
} from '../../actions/prefs';

import {
  openReport,
} from '../../actions/report';

import {
  getOpenModalName,
  getUserPerms,
} from '../../reducers';

const mapStateToProps = (state) => ({
  openModalName: getOpenModalName(state),
  perms: getUserPerms(state),
});

const mapDispatchToProps = {
  closeModal,
  openModal,
  openReport,
  setToolTab,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportPage);
