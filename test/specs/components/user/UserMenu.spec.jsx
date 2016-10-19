import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';

import createTestContainer from '../../../helpers/createTestContainer';

import UserMenu from '../../../../src/components/user/UserMenu';

chai.should();

const expectedClassName = 'cspace-ui-UserMenu--common';
const username = 'user@collectionspace.org';

describe('UserMenu', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <UserMenu username={username} />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <UserMenu username={username} />
      </IntlProvider>, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });
});
