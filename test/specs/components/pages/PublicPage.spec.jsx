import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';

import createTestContainer from '../../../helpers/createTestContainer';

import PublicPage from '../../../../src/components/pages/PublicPage';

chai.should();

describe('PublicPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <PublicPage />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render the content', function test() {
    render(
      <IntlProvider locale="en">
        <PublicPage>
          <div id="content">This is some content</div>
        </PublicPage>
      </IntlProvider>, this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });
});
