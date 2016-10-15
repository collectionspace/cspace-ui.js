/* global window, document */
/* eslint-disable no-unused-expressions */

import init from '../../src';

chai.should();

function setup() {
  document.body.insertAdjacentHTML(
    'beforeend',
    '<main></main>');
}

function getBasePath() {
  const path = window.location.pathname;

  if (path.startsWith('/context.html')) {
    return '/context.html';
  }

  if (path.startsWith('/debug.html')) {
    return '/debug.html';
  }

  return '';
}

describe('ui', function suite() {
  beforeEach(function before() {
    setup();
  });

  it('renders successfully', function test(done) {
    init({
      basename: getBasePath(),
      cspaceUrl: 'http://nightly.collectionspace.org:8180',
      prettyUrls: true,
      messages: {
        'about.title': 'CollectionSpace is running in Karma',
      },
    });

    window.setTimeout(() => {
      document.body.querySelector('main').firstElementChild.should.not.be.null;
      done();
    }, 1000);
  });
});
