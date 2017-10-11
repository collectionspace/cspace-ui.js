/* global window, URL */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import styles from '../../../styles/cspace-ui/Image.css';

const propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  errorMessage: PropTypes.node,
  pendingMessage: PropTypes.node,
  retry: PropTypes.bool,
  retryLimit: PropTypes.number,
  readImage: PropTypes.func.isRequired,
};

const defaultProps = {
  errorMessage: '',
  pendingMessage: '',
  retry: false,
  retryLimit: 5,
};

/**
 * A replacement for img that gets images from the CollectionSpace REST API using token auth.
 */
export default class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blobUrl: null,
    };
  }

  componentDidMount() {
    this.readImage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) {
      this.reset();
      this.readImage();
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

    if (this.retryTimer) {
      window.clearTimeout(this.retryTimer);

      this.retryTimer = null;
    }
  }

  tryReadImage(retriesRemaining) {
    const {
      src,
      retryLimit,
      readImage,
    } = this.props;

    readImage(src)
      .then((response) => {
        if (response.status === 200 && response.data && !this.isUnmounted) {
          this.setState({
            blobUrl: URL.createObjectURL(response.data),
          });
        }
      })
      .catch((error) => {
        if (!this.isUnmounted) {
          if (get(error, ['response', 'status']) === 404 && retriesRemaining > 0) {
            // Make retries back off exponentially.

            const pauseTime = Math.pow(2, retryLimit - retriesRemaining) * 1000;

            this.retryTimer = window.setTimeout(() => {
              this.tryReadImage(retriesRemaining - 1);
            }, pauseTime);
          } else {
            this.setState({
              isError: true,
            });
          }
        }
      });
  }

  readImage() {
    const {
      retry,
      retryLimit,
    } = this.props;

    const retriesRemaining = retry ? retryLimit : 0;

    this.tryReadImage(retriesRemaining);
  }

  render() {
    const {
      alt,
      errorMessage,
      pendingMessage,
      /* eslint-disable no-unused-vars */
      src,
      retry,
      retryLimit,
      readImage,
      /* eslint-enable no-unused-vars */
      ...remainingProps
    } = this.props;

    const {
      blobUrl,
      isError,
    } = this.state;

    if (isError) {
      return (
        <div className={styles.error}>{errorMessage}</div>
      );
    }

    if (blobUrl) {
      return (
        <img className={styles.normal} src={blobUrl} alt={alt} {...remainingProps} />
      );
    }

    return (
      <div className={styles.pending}>{pendingMessage}</div>
    );
  }
}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;
