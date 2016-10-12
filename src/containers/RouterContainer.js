import { connect } from 'react-redux';

import {
  createNewRecord,
  readRecord,
} from '../actions/record';

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
  createNewRecord,
  readRecord,
  redirectLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);
