import { connect } from 'react-redux';
import SearchResultReportPanel from '../../components/search/SearchResultReportPanel';

import {
  openReport,
} from '../../actions/report';

import {
  getUserPerms,
} from '../../reducers';

const mapStateToProps = state => ({
  perms: getUserPerms(state),
});

const mapDispatchToProps = {
  openReport,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultReportPanel);
