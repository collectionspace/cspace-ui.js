/* global URL */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  readContent: PropTypes.func.isRequired,
  renderError: PropTypes.func,
  renderLoading: PropTypes.func,
};

export default class ContentViewerPage extends Component {
  constructor() {
    super();

    this.state = {
      blobUrl: null,
    };
  }

  componentDidMount() {
    this.readContent();
  }

  componentDidUpdate(prevProps) {
    const contentPath = get(this.props.match, ['params', 'contentPath']);
    const prevContentPath = get(prevProps.match, ['params', 'contentPath']);

    if (contentPath !== prevContentPath) {
      this.reset();
      this.readContent();
    }
  }

  componentWillUnmount() {
    this.reset();
    this.isUnmounted = true;
  }

  reset() {
    const {
      blobUrl,
    } = this.state;

    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);

      this.setState({
        blobUrl: null,
      });
    }
  }

  readContent() {
    const {
      location,
      match,
      readContent,
    } = this.props;

    readContent(location, match)
      .then((response) => {
        if (response && response.status === 200 && response.data && !this.isUnmounted) {
          this.setState({
            blobUrl: URL.createObjectURL(response.data),
          });
        }
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });
  }

  render() {
    const {
      renderError,
      renderLoading,
    } = this.props;

    const {
      blobUrl,
      error,
    } = this.state;

    if (error) {
      return (renderError ? renderError(error) : null);
    }

    if (!blobUrl) {
      return (renderLoading ? renderLoading() : null);
    }

    const style = {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      border: 'none',
    };

    return (
      <iframe src={blobUrl} style={style} />
    );
  }
}

ContentViewerPage.propTypes = propTypes;
