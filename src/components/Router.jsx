import React, { Component, PropTypes } from 'react';
import { Router as ReactRouter } from 'react-router';
import routes from '../routes';

export default class Router extends Component {
  constructor(props) {
    super(props);

    this.routes = routes(
      props.index,
      this.onEnterRecord.bind(this),
      this.onEnterProtected.bind(this));
  }

  onEnterRecord(nextState) {
    const {
      readRecord,
    } = this.props;

    const {
      service,
      csid,
    } = nextState.params;

    readRecord(service, csid);
  }

  onEnterProtected(nextState, replace) {
    const {
      username,
      redirectLogin,
    } = this.props;

    if (!username) {
      redirectLogin(replace, nextState.location.pathname);
    }
  }

  render() {
    const {
      history,
    } = this.props;

    return (
      <ReactRouter history={history}>
        {this.routes}
      </ReactRouter>
    );
  }
}

Router.propTypes = {
  history: PropTypes.object.isRequired,
  readRecord: PropTypes.func.isRequired,
  redirectLogin: PropTypes.func.isRequired,
  index: PropTypes.string,
  username: PropTypes.string,
};
