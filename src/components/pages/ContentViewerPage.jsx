/* global URL */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const propTypes = {
  match: PropTypes.object,
  readContent: PropTypes.func.isRequired,
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
      match,
      readContent,
    } = this.props;

    const contentPath = get(match, ['params', 'contentPath']);

    if (contentPath) {
      readContent(contentPath)
        .then((response) => {
          if (response.status === 200 && response.data && !this.isUnmounted) {
            this.setState({
              blobUrl: URL.createObjectURL(response.data),
            });
          }
        });
    }
  }

  render() {
    const {
      blobUrl,
    } = this.state;

    if (!blobUrl) {
      return null;
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
