import { connect } from 'react-redux';
import Footer from '../../components/sections/Footer';

import {
  getCSpaceSystemInfo,
} from '../../reducers';

const mapStateToProps = (state) => ({
  systemInfo: getCSpaceSystemInfo(state),
});

export default connect(
  mapStateToProps,
)(Footer);
