import { connect } from 'react-redux';

import {
  redirectLogin,
} from '../actions/login';

import {
  getUserUsername,
} from '../reducers';

import Router from '../components/Router';

const mapStateToProps = state => ({
  username: getUserUsername(state),
});

const mapDispatchToProps = {
  redirectLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);
