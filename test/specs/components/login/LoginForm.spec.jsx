import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter as Router } from 'react-router';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import LoginForm from '../../../../src/components/login/LoginForm';

chai.should();

const expectedClassName = 'cspace-ui-LoginForm--common';

describe('LoginForm', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should show renew link when isExpired is true', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm isExpired username="admin@core.collectionspace.org" />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('a').textContent.should
      .equal('Renew session');
  });
});
