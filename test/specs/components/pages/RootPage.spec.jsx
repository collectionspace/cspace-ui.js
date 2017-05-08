import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';

import createTestContainer from '../../../helpers/createTestContainer';

import RootPage from '../../../../src/components/pages/RootPage';

chai.should();

describe('RootPage', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render the content', function test() {
    render(
      <IntlProvider locale="en">
        <RootPage>
          <div id="content">This is some content</div>
        </RootPage>
      </IntlProvider>, this.container);

    this.container.querySelector('div > div#content').textContent.should
      .equal('This is some content');
  });
});
