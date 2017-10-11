/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ImageGallery from 'react-image-gallery';
import { baseComponents as inputComponents } from 'cspace-input';
import ImageContainer from '../../containers/media/ImageContainer';

import {
  VIEWER_WINDOW_NAME,
  DERIVATIVE_MEDIUM,
  DERIVATIVE_ORIGINAL,
  DERIVATIVE_THUMBNAIL,
  getDerivativePath,
  getImageViewerPath,
} from '../../helpers/blobHelpers';

import styles from '../../../styles/cspace-ui/MediaViewer.css';

/* eslint-disable import/imports-first, import/no-unresolved */
import '!style-loader!css-loader!react-image-gallery/styles/css/image-gallery-no-icon.css';
/* eslint-enable import/imports-first, import/no-unresolved */

const { MiniButton } = inputComponents;

const renderItem = item => (
  <div className="image-gallery-image">
    <ImageContainer
      src={item.original}
      alt={item.originalAlt}
      srcSet={item.srcSet}
      sizes={item.sizes}
      title={item.originalTitle}
      data-csid={item.blobCsid}
    />
  </div>
);

const renderThumbInner = item => (
  <div>
    <ImageContainer
      src={item.thumbnail}
      alt={item.thumbnailAlt}
      title={item.thumbnailTitle}
    />
    <div className="image-gallery-thumbnail-label">
      {item.thumbnailLabel}
    </div>
  </div>
);

const renderLeftNav = (onClick, disabled) => (
  <MiniButton name="mediaViewerPrev" disabled={disabled} onClick={onClick}>&lt;</MiniButton>
);

const renderRightNav = (onClick, disabled) => (
  <MiniButton name="mediaViewerNext" disabled={disabled} onClick={onClick}>&gt;</MiniButton>
);

const propTypes = {
  carouselDerivative: PropTypes.string,
  thumbnailDerivative: PropTypes.string,
  popupDerivative: PropTypes.string,
  config: PropTypes.object.isRequired,
  isSearchPending: PropTypes.bool,
  listType: PropTypes.string,
  ownBlobCsid: PropTypes.string,
  searchResult: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  carouselDerivative: DERIVATIVE_MEDIUM,
  thumbnailDerivative: DERIVATIVE_THUMBNAIL,
  popupDerivative: DERIVATIVE_ORIGINAL,
  listType: 'common',
};

export default class MediaViewer extends Component {
  constructor() {
    super();

    this.handleImageGalleryClick = this.handleImageGalleryClick.bind(this);
  }

  handleImageGalleryClick(event) {
    const {
      target,
    } = event;

    if (target.nodeName === 'IMG') {
      const {
        popupDerivative,
      } = this.props;

      const popupImagePath = getDerivativePath(target.dataset.csid, popupDerivative);

      window.open(getImageViewerPath(popupImagePath), VIEWER_WINDOW_NAME);
    }
  }

  createGalleryImage(blobCsid) {
    const {
      carouselDerivative,
      thumbnailDerivative,
    } = this.props;

    return {
      blobCsid,
      original: getDerivativePath(blobCsid, carouselDerivative),
      thumbnail: getDerivativePath(blobCsid, thumbnailDerivative),
    };
  }

  render() {
    const {
      config,
      isSearchPending,
      listType,
      ownBlobCsid,
      searchResult,
    } = this.props;

    const images = [];

    if (ownBlobCsid) {
      images.push(this.createGalleryImage(ownBlobCsid));
    }

    if (searchResult) {
      const listTypeConfig = config.listTypes[listType];

      const {
        listNodeName,
        itemNodeName,
      } = listTypeConfig;

      const list = searchResult.get(listNodeName);
      const totalItems = parseInt(list.get('totalItems'), 10);

      if (!isNaN(totalItems)) {
        let items = list.get(itemNodeName);

        if (items) {
          if (!Immutable.List.isList(items)) {
            items = Immutable.List.of(items);
          }

          items.forEach((item) => {
            const blobCsid = item.get('blobCsid');

            if (blobCsid) {
              images.push(this.createGalleryImage(blobCsid));
            }
          });
        }
      }
    }

    if (images.length > 0) {
      return (
        <div className={styles.normal}>
          <ImageGallery
            items={images}
            lazyLoad
            renderLeftNav={renderLeftNav}
            renderRightNav={renderRightNav}
            showThumbnails={images.length > 1}
            showFullscreenButton={false}
            showPlayButton={false}
            onClick={this.handleImageGalleryClick}
            renderItem={renderItem}
            renderThumbInner={renderThumbInner}
          />
        </div>
      );
    }

    if (isSearchPending) {
      return null;
    }

    return (
      <div className={styles.empty} />
    );
  }
}

MediaViewer.propTypes = propTypes;
MediaViewer.defaultProps = defaultProps;
