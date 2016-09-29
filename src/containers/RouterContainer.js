import { connect } from 'react-redux';

import {
  createNewRecord,
  readRecord,
  redirectLogin,
} from '../actions';

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
