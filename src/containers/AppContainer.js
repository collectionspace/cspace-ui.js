import { connect } from 'react-redux';
import App from '../components/App';

import {
  openModal,
} from '../actions/notification';

const mapDispatchToProps = {
  openModal,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(App);
