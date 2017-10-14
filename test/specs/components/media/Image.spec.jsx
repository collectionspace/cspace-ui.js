/* global window, Blob */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Image from '../../../../src/components/media/Image';
import createTestContainer from '../../../helpers/createTestContainer';

const expect = chai.expect;

chai.should();

describe('Image', function suite() {
  const readImage = () => Promise.resolve({
    status: 200,
    data: new Blob(),
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render a div when mounted, then an img once the content has been read', function test() {
    render(<Image src="blobs/1234/content" readImage={readImage} />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const img = this.container.firstElementChild;

        img.nodeName.should.equal('IMG');
        img.src.should.match(/^blob:/);

        resolve();
      }, 0);
    });
  });

  it('should retry reading the image when a 404 is received if retry is true', function test() {
    this.timeout(5000);

    const retryLimit = 2;

    let readImageCalledCount = 0;

    const readImage404 = () => {
      readImageCalledCount += 1;

      return Promise.reject({
        response: {
          status: 404,
        },
      });
    };

    render(
      <Image
        src="blobs/1234/content"
        readImage={readImage404}
        retryLimit={retryLimit}
        retry
      />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        readImageCalledCount.should.equal(retryLimit + 1);

        resolve();
      }, 4000);
    });
  });

  it('should render a div when there is an error reading the image', function test() {
    const readImage500 = () => Promise.reject({
      response: {
        status: 500,
      },
    });

    render(<Image src="blobs/1234/content" readImage={readImage500} />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.firstElementChild.nodeName.should.equal('DIV');

        resolve();
      }, 0);
    });
  });

  it('should clear previous content when the content path changes', function test() {
    render(
      <Image
        src="blobs/1234/content"
        readImage={readImage}
      />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const img = this.container.firstElementChild;

        img.nodeName.should.equal('IMG');
        img.src.should.match(/^blob:/);

        render(
          <Image
            src="blobs/5678/content"
            readImage={readImage}
          />, this.container);

        this.container.firstElementChild.nodeName.should.equal('DIV');

        resolve();
      }, 0);
    });
  });

  it('should render nothing if unmounted before the content is read', function test() {
    render(
      <Image
        src="blobs/1234/content"
        readImage={readImage}
      />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');

    unmountComponentAtNode(this.container);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        expect(this.container.firstElementChild).to.equal(null);

        resolve();
      }, 0);
    });
  });

  it('should stop retrying reading the image if unmounted', function test() {
    this.timeout(5000);

    const retryLimit = 2;

    let readImageCalledCount = 0;

    const readImage404 = () => {
      readImageCalledCount += 1;

      return Promise.reject({
        response: {
          status: 404,
        },
      });
    };

    render(
      <Image
        src="blobs/1234/content"
        readImage={readImage404}
        retryLimit={retryLimit}
        retry
      />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');

    window.setTimeout(() => {
      unmountComponentAtNode(this.container);
    }, 0);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        readImageCalledCount.should.equal(1);

        resolve();
      }, 4000);
    });
  });
});
