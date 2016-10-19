import React from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import PublicPage from '../../../../src/components/pages/PublicPage';

chai.should();

describe('PublicPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<PublicPage />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the content', function test() {
    render(
      <PublicPage>
        <div id="content">This is some content</div>
      </PublicPage>, this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });
});
