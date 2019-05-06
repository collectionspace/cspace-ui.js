/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import get from 'lodash/get';
import ImageGallery from 'react-image-gallery';
import { baseComponents as inputComponents } from 'cspace-input';
import ImageContainer from '../../containers/media/ImageContainer';
import { getContentPath } from '../../helpers/contentHelpers';

import {
  VIEWER_WINDOW_NAME,
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
      src={item.snapshot}
      alt={item.snapshotAlt}
      srcSet={item.srcSet}
      sizes={item.sizes}
      title={item.snapshotTitle}
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
    <div className="image-gallery-thumbnail-label" 
         hidden={item.thumbnailLabel === undefined ? true : false}>
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
  config: PropTypes.object.isRequired,
  isSearchPending: PropTypes.bool,
  listType: PropTypes.string,
  ownBlobCsid: PropTypes.string,
  searchResult: PropTypes.instanceOf(Immutable.Map),
  readRecord: PropTypes.func,
};

const defaultProps = {
  listType: 'common',
  readRecord: () => Promise.resolve(),
};

export default class MediaViewer extends Component {
  constructor() {
    super();

    this.handleImageGalleryClick = this.handleImageGalleryClick.bind(this);
  }

  getPopupImagePath(blobCsid) {
    const {
      config,
      readRecord,
    } = this.props;

    const recordTypeConfig = get(config, ['recordTypes', 'blob']);
    const popupSubresource = get(recordTypeConfig, ['content', 'popup', 'subresource']);

    return readRecord(config, recordTypeConfig, undefined, blobCsid)
      .then(blobData => getContentPath(config, 'blob', undefined, blobCsid, popupSubresource, blobData));
  }

  handleImageGalleryClick(event) {
    const {
      target,
    } = event;

    if (target.nodeName === 'IMG') {
      this.getPopupImagePath(target.dataset.csid)
        .then((popupImagePath) => {
          window.open(getImageViewerPath(this.props.config, popupImagePath), VIEWER_WINDOW_NAME);
        });
    }
  }

  createGalleryImage(blobCsid) {
    const {
      config,
    } = this.props;

    const content = get(config, ['recordTypes', 'blob', 'content']);
    const snapshotSubresource = get(content, ['snapshot', 'subresource']);
    const thumbnailSubresource = get(content, ['thumbnail', 'subresource']);

    return {
      blobCsid,
      snapshot: getContentPath(config, 'blob', undefined, blobCsid, snapshotSubresource),
      thumbnail: getContentPath(config, 'blob', undefined, blobCsid, thumbnailSubresource),
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
            disableArrowKeys
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
