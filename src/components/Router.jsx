import React, { Component, PropTypes } from 'react';
import { Router as ReactRouter } from 'react-router';
import routes from '../routes';

export default class Router extends Component {
  constructor(props) {
    super(props);

    this.routes = routes(this.onEnterProtected.bind(this));
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
  redirectLogin: PropTypes.func.isRequired,
  username: PropTypes.string,
};

