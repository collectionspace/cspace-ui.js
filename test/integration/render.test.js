/* global window, document */

import chai from 'chai';
import { init } from '../../src';

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

  it('renders successfully', () => {
    init({
      basename: getBasePath(),
      cspaceUrl: 'http://nightly.collectionspace.org:8180',
      prettyUrls: true,
      messages: {
        'about.title': 'CollectionSpace is running in Karma',
      },
    });
  });
});
