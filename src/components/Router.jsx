import React, { Component, PropTypes } from 'react';
import { Router as ReactRouter } from 'react-router';
import routes from '../routes';

const propTypes = {
  createNewRecord: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  readRecord: PropTypes.func.isRequired,
  redirectLogin: PropTypes.func.isRequired,
  className: PropTypes.string,
  index: PropTypes.string,
  username: PropTypes.string,
};

const contextTypes = {
  config: PropTypes.object,
};

export default class Router extends Component {
  constructor(props) {
    super(props);

    this.routes = routes({
      className: props.className,
      index: props.index,
      onEnterProtected: this.onEnterProtected.bind(this),
      onEnterRecord: this.onEnterRecord.bind(this),
    });
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
      config,
    } = this.context;

    const recordTypeConfig = config.recordTypes[recordType];

    if (recordTypeConfig) {
      if (csid) {
        readRecord(recordTypeConfig, csid);
      } else {
        createNewRecord(recordTypeConfig);
      }
    } else {
      // TODO: Unknown record type. Show error page.
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

Router.propTypes = propTypes;
Router.contextTypes = contextTypes;
