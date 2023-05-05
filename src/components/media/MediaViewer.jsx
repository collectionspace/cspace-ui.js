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

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import '!style-loader!css-loader!react-image-gallery/styles/css/image-gallery.css';

const { MiniButton } = inputComponents;

const renderItem = (item) => (
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

const renderThumbInner = (item) => (
  <div>
    <ImageContainer
      src={item.thumbnail}
      alt={item.thumbnailAlt}
      title={item.thumbnailTitle}
    />
    {
      item.thumbnailLabel && (
        <div className="image-gallery-thumbnail-label">
          {item.thumbnailLabel}
        </div>
      )
    }
  </div>
);

const renderLeftNav = (onClick, disabled) => (
  <MiniButton name="mediaViewerPrev" disabled={disabled} onClick={onClick}>&lt;</MiniButton>
);

const renderRightNav = (onClick, disabled) => (
  <MiniButton name="mediaViewerNext" disabled={disabled} onClick={onClick}>&gt;</MiniButton>
);

const propTypes = {
  config: PropTypes.shape({
    listTypes: PropTypes.object,
    recordTypes: PropTypes.object,
  }).isRequired,
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

  handleImageGalleryClick(event) {
    const {
      target,
    } = event;

    const {
      config,
    } = this.props;

    if (target.nodeName === 'IMG') {
      this.getPopupImagePath(target.dataset.csid)
        .then((popupImagePath) => {
          window.open(getImageViewerPath(config, popupImagePath), VIEWER_WINDOW_NAME);
        });
    }
  }

  getPopupImagePath(blobCsid) {
    const {
      config,
      readRecord,
    } = this.props;

    const recordTypeConfig = get(config, ['recordTypes', 'blob']);
    const popupSubresource = get(recordTypeConfig, ['content', 'popup', 'subresource']);

    return readRecord(config, recordTypeConfig, undefined, blobCsid)
      .then((blobData) => getContentPath(config, 'blob', undefined, blobCsid, popupSubresource, blobData));
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
      // note: react-image-gallery requires item.original to be non-null, so it might be best to
      // move from snapshot to original here to keep similar semantics
      original: getContentPath(config, 'blob', undefined, blobCsid, snapshotSubresource),
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

      if (!Number.isNaN(totalItems)) {
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
            disableKeyDown
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
