/* global document */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OpenSeadragon from 'openseadragon';
import blankIcon from '../../../images/blank.svg';
import imageFullscreenIcon from '../../../images/imageFullscreen.svg';
import imageFullscreenActiveIcon from '../../../images/imageFullscreenActive.svg';
import imageHomeIcon from '../../../images/imageHome.svg';
import imageHomeActiveIcon from '../../../images/imageHomeActive.svg';
import imageRotateLeftIcon from '../../../images/imageRotateLeft.svg';
import imageRotateLeftActiveIcon from '../../../images/imageRotateLeftActive.svg';
import imageRotateRightIcon from '../../../images/imageRotateRight.svg';
import imageRotateRightActiveIcon from '../../../images/imageRotateRightActive.svg';
import imageZoomInIcon from '../../../images/imageZoomIn.svg';
import imageZoomInActiveIcon from '../../../images/imageZoomInActive.svg';
import imageZoomOutIcon from '../../../images/imageZoomOut.svg';
import imageZoomOutActiveIcon from '../../../images/imageZoomOutActive.svg';
import styles from '../../../styles/cspace-ui/ImageViewer.css';
import saveLinkStyles from '../../../styles/cspace-ui/ImageViewerSaveLink.css';

const propTypes = {
  blobUrl: PropTypes.string.isRequired,
  filename: PropTypes.string,
};

const defaultProps = {
  filename: '',
};

export default class ImageViewer extends Component {
  constructor() {
    super();

    this.handleContainerRef = this.handleContainerRef.bind(this);
  }

  componentDidMount() {
    const {
      blobUrl,
      filename,
    } = this.props;

    const viewer = OpenSeadragon({
      element: this.containerElement,
      navImages: {
        zoomIn: {
          REST: imageZoomInIcon,
          GROUP: blankIcon,
          HOVER: imageZoomInActiveIcon,
          DOWN: imageZoomInActiveIcon,
        },
        zoomOut: {
          REST: imageZoomOutIcon,
          GROUP: blankIcon,
          HOVER: imageZoomOutActiveIcon,
          DOWN: imageZoomOutActiveIcon,
        },
        home: {
          REST: imageHomeIcon,
          GROUP: blankIcon,
          HOVER: imageHomeActiveIcon,
          DOWN: imageHomeActiveIcon,
        },
        fullpage: {
          REST: imageFullscreenIcon,
          GROUP: blankIcon,
          HOVER: imageFullscreenActiveIcon,
          DOWN: imageFullscreenActiveIcon,
        },
        rotateleft: {
          REST: imageRotateLeftIcon,
          GROUP: blankIcon,
          HOVER: imageRotateLeftActiveIcon,
          DOWN: imageRotateLeftActiveIcon,
        },
        rotateright: {
          REST: imageRotateRightIcon,
          GROUP: blankIcon,
          HOVER: imageRotateRightActiveIcon,
          DOWN: imageRotateRightActiveIcon,
        },
      },
      gestureSettingsTouch: {
        pinchRotate: true,
      },
      prefixUrl: '',
      showNavigator: true,
      showRotationControl: true,
      tileSources: {
        type: 'image',
        url: blobUrl,
      },
    });

    const saveLink = document.createElement('a');
    saveLink.className = saveLinkStyles.common;
    saveLink.href = blobUrl;
    saveLink.download = filename;
    saveLink.title = 'Save';

    viewer.buttons.element.appendChild(saveLink);

    this.viewer = viewer;
  }

  componentWillUnmount() {
    if (this.viewer) {
      this.viewer.destroy();
    }

    this.viewer = null;
  }

  handleContainerRef(ref) {
    this.containerElement = ref;
  }

  render() {
    return (
      <div className={styles.common}>
        <div ref={this.handleContainerRef} />
      </div>
    );
  }
}

ImageViewer.propTypes = propTypes;
ImageViewer.defaultProps = defaultProps;
