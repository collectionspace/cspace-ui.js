/* global window, document */

import chai from 'chai';
import cspaceUI from '../../src';

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
  beforeEach(function check() {
    if (typeof window === 'undefined') {
      this.skip();
    }

    setup();
  });

  it('renders successfully', () => {
    cspaceUI({
      basename: getBasePath(),
      cspaceUrl: 'http://nightly.collectionspace.org:8180',
    });
  });
});
