/* global window */

import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import MediaViewer from '../../../../src/components/media/MediaViewer';

const expect = chai.expect;

chai.should();

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
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<MediaViewer config={config} />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the search result', function test() {
    render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />, this.container);

    this.container.querySelector('.image-gallery').should.not.equal(null);
    this.container.querySelectorAll('.image-gallery-thumbnail').length.should.equal(3);
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

    render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={emptySearchResult}
      />, this.container);

    this.container.firstElementChild.className.should.equal('cspace-ui-MediaViewer--empty');
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

    render(
      <MediaViewer
        config={config}
        isSearchPending
        searchDescriptor={searchDescriptor}
        searchResult={emptySearchResult}
      />, this.container);

    expect(this.container.firstElementChild).to.equal(null);
  });

  it('should render a single search result', function test() {
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

    render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={singleSearchResult}
      />, this.container);

    expect(this.container.querySelector('.image-gallery-thumbnail')).to.equal(null);
    this.container.querySelector('.image-gallery-image > img').src.should.match(/03794600-d98f-44a6-8985/);
  });

  // This test works on a local Chrome, but it's flaky on Sauce Labs because of opening and closing
  // the popup window. Skip it for now.

  it.skip('should open a window when the carousel image is clicked', function test() {
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

    render(
      <MediaViewer
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={singleSearchResult}
      />, this.container);

    const image = this.container.querySelector('.image-gallery-image > img');

    Simulate.click(image);

    const mediaViewerWindow = window.open('', 'mediaViewer');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        mediaViewerWindow.location.href.should.match(/\/03794600-d98f-44a6-8985\/content/);
        mediaViewerWindow.close();

        resolve();
      }, 200);
    });
  });

  it('should render the own blobCsid image first', function test() {
    render(
      <MediaViewer
        ownBlobCsid="1234"
        config={config}
        searchDescriptor={searchDescriptor}
        searchResult={searchResult}
      />, this.container);

    const thumbnails = this.container.querySelectorAll('.image-gallery-thumbnail');

    thumbnails.length.should.equal(4);

    thumbnails[0].querySelector('img').src.should.match(/blobs\/1234\/derivatives\/Thumbnail/);
  });
});
