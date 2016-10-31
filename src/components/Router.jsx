import React, { Component, PropTypes } from 'react';
import { Router as ReactRouter } from 'react-router';
import routes from '../routes';

export default class Router extends Component {
  constructor(props) {
    super(props);

    this.routes = routes(
      props.index,
      this.onEnterRecord.bind(this),
      this.onEnterProtected.bind(this)
    );
  }

  onEnterRecord(nextState) {
    const {
      createNewRecord,
      readRecord,
    } = this.props;

    const {
      recordType,
      csid,
    } = nextState.params;

    const {
      recordPlugins,
    } = this.context;

    const recordPlugin = recordPlugins[recordType];

    if (recordPlugin) {
      const serviceConfig = recordPlugin.serviceConfig;

      if (csid) {
        readRecord(serviceConfig, csid);
      } else {
        createNewRecord(serviceConfig);
      }
    } else {
      // TODO: Unknown record type. Show error page.
    }
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
  createNewRecord: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  readRecord: PropTypes.func.isRequired,
  redirectLogin: PropTypes.func.isRequired,
  index: PropTypes.string,
  username: PropTypes.string,
};

Router.contextTypes = {
  recordPlugins: PropTypes.object,
};
