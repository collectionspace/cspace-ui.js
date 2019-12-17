import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import ImageViewer from '../media/ImageViewer';

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
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
    const {
      match,
    } = this.props;

    const {
      match: prevMatch,
    } = prevProps;

    const contentPath = get(match, ['params', 'contentPath']);
    const prevContentPath = get(prevMatch, ['params', 'contentPath']);

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
          const contentDisposition = response.headers['content-disposition'];

          const filename = (contentDisposition && contentDisposition.match(/filename="(.*?)"/))
            ? RegExp.$1
            : null;

          this.setState({
            filename,
            blobUrl: URL.createObjectURL(response.data),
            contentType: response.headers['content-type'],
          });
        }
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });
  }

  renderImageViewer() {
    const {
      blobUrl,
      filename,
    } = this.state;

    return (
      <ImageViewer
        blobUrl={blobUrl}
        filename={filename}
      />
    );
  }

  renderBlobViewer() {
    const {
      blobUrl,
    } = this.state;

    const style = {
      position: 'fixed',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      border: 'none',
    };

    // Load the blob into an iframe to get the default viewer.

    return (
      // TODO: Make title a message.
      <iframe src={blobUrl} style={style} title="File content" />
    );
  }

  render() {
    const {
      renderError,
      renderLoading,
    } = this.props;

    const {
      blobUrl,
      contentType,
      error,
      filename,
    } = this.state;

    if (error) {
      return (renderError ? renderError(error) : null);
    }

    if (!blobUrl) {
      return (renderLoading ? renderLoading() : null);
    }

    const title = filename
      ? <Helmet><title>{filename}</title></Helmet>
      : null;

    let viewer;

    if (contentType.startsWith('image/')) {
      viewer = this.renderImageViewer();
    } else {
      viewer = this.renderBlobViewer();
    }

    return (
      <div>
        {title}
        {viewer}
      </div>
    );
  }
}

ContentViewerPage.propTypes = propTypes;
