import React from 'react';
import { render } from 'react-dom';

import createTestContainer from '../../../helpers/createTestContainer';

import RootPage from '../../../../src/components/pages/RootPage';

chai.should();

describe('RootPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(<RootPage />, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the content', function test() {
    render(
      <RootPage>
        <div id="content">This is some content</div>
      </RootPage>, this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });
});
