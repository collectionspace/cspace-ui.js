/* global window */

import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { findWithType } from 'react-shallow-testutils';
import Immutable from 'immutable';
import ImageGallery from 'react-image-gallery';
import { baseComponents as inputComponents } from 'cspace-input';
import ImageContainer from '../../../../src/containers/media/ImageContainer';
import MediaViewer from '../../../../src/components/media/MediaViewer';

const expect = chai.expect;

chai.should();

const { MiniButton } = inputComponents;

const searchDescriptor = Immutable.fromJS({
  recordType: 'media',
  searchQuery: {
    p: 0,
    size: 0,
    rel: '1234',
  },
});

const config = {
  listTypes: {
    common: {
      listNodeName: 'ns2:abstract-common-list',
      itemNodeName: 'list-item',
    },
  },
  recordTypes: {
    object: {
      name: 'media',
      columns: {
      },
    },
  },
};

const searchResult = Immutable.fromJS({
  'ns2:abstract-common-list': {
    pageNum: '0',
    pageSize: '2500',
    itemsInPage: '3',
    totalItems: '3',
    'list-item': [
      {
        blobCsid: '03794600-d98f-44a6-8985',
        csid: 'b0945c52-36f7-4c51-a72a',
      },
      {
        blobCsid: '42e46bf9-f09d-49ec-8334',
        csid: '3a60107e-4802-41a2-b319',
      },
      {
        blobCsid: '8fdd5910-c579-4ed4-b52b',
        csid: '5a57909a-2f51-4e42-bb58',
      },
    ],
  },
});

describe('MediaViewer', function suite() {
  it('should render a div', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(<MediaViewer config={config} />);

    const result = shallowRenderer.getRenderOutput();

    result.type.should.equal('div');
  });

  it('should render an ImageGallery when there is a search result', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const gallery = findWithType(result, ImageGallery);

    gallery.should.not.equal(null);
    gallery.props.items.should.have.lengthOf(3);
  });

  it('should render with empty class when the search result contains no items', function test() {
    const emptySearchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '2500',
        itemsInPage: '0',
        totalItems: '0',
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={emptySearchResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    result.props.className.should.equal('cspace-ui-MediaViewer--empty');
  });

  it('should render an ImageContainer for each carousel image', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const gallery = findWithType(result, ImageGallery);

    gallery.should.not.equal(null);

    const carouselImage = gallery.props.renderItem({});

    findWithType(carouselImage, ImageContainer).should.not.equal(null);
  });

  it('should render an ImageContainer for each thumbnail image', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const gallery = findWithType(result, ImageGallery);

    gallery.should.not.equal(null);

    const thumbImage = gallery.props.renderThumbInner({});

    findWithType(thumbImage, ImageContainer).should.not.equal(null);
  });

  it('should render a MiniButton for each nav button', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const gallery = findWithType(result, ImageGallery);

    gallery.should.not.equal(null);

    const leftNavButton = gallery.props.renderLeftNav();

    findWithType(leftNavButton, MiniButton).should.not.equal(null);

    const rightNavButton = gallery.props.renderRightNav();

    findWithType(rightNavButton, MiniButton).should.not.equal(null);
  });

  it('should render nothing when the search is pending', function test() {
    const emptySearchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '2500',
        itemsInPage: '0',
        totalItems: '0',
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewer
        config={config}
        isSearchPending
        searchDescriptor={searchDescriptor}
        searchResult={emptySearchResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should not render thumbnails for a single search result', function test() {
    const singleSearchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '2500',
        itemsInPage: '1',
        totalItems: '1',
        'list-item': {
          blobCsid: '03794600-d98f-44a6-8985',
          csid: 'b0945c52-36f7-4c51-a72a',
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={singleSearchResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const gallery = findWithType(result, ImageGallery);

    gallery.should.not.equal(null);
    gallery.props.items.should.have.lengthOf(1);
    gallery.props.showThumbnails.should.equal(false);
  });

  // This test works on a local Chrome, but it's flaky on Sauce Labs because of opening and closing
  // the popup window. Skip it for now.

  it('should open a window when the carousel image is clicked', function test() {
    const blobCsid = '03794600-d98f-44a6-8985';

    const singleSearchResult = Immutable.fromJS({
      'ns2:abstract-common-list': {
        pageNum: '0',
        pageSize: '2500',
        itemsInPage: '1',
        totalItems: '1',
        'list-item': {
          blobCsid,
          csid: 'b0945c52-36f7-4c51-a72a',
        },
      },
    });

    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={singleSearchResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const gallery = findWithType(result, ImageGallery);

    const savedOpenFunc = window.open;

    let openedUrl = null;

    window.open = (urlParam) => {
      openedUrl = urlParam;
    };

    gallery.props.onClick({
      target: {
        nodeName: 'IMG',
        dataset: {
          csid: blobCsid,
        },
      },
    });

    openedUrl.should.equal(`/view/blobs/${blobCsid}/content`);

    window.open = savedOpenFunc;
  });

  it('should render the own blobCsid image first', function test() {
    const shallowRenderer = createRenderer();

    shallowRenderer.render(
      <MediaViewer
        ownBlobCsid="1234"
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />
    );

    const result = shallowRenderer.getRenderOutput();
    const gallery = findWithType(result, ImageGallery);

    gallery.should.not.equal(null);
    gallery.props.items.should.have.lengthOf(4);
    gallery.props.items[0].blobCsid.should.equal('1234');
  });
});
