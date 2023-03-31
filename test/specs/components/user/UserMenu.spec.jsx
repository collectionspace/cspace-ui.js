import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { IntlProvider } from 'react-intl';

import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';

import UserMenu from '../../../../src/components/user/UserMenu';

chai.should();

const expectedClassName = 'cspace-ui-UserMenu--common';
const username = 'user@collectionspace.org';

describe('UserMenu', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <Router>
          <UserMenu username={username} />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <Router>
          <UserMenu username={username} />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });
});
