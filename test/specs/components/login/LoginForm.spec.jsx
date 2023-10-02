import React from 'react';
import { IntlProvider } from 'react-intl';
import Immutable from 'immutable';
import configureMockStore from 'redux-mock-store';
import { Provider as StoreProvider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import LoginForm from '../../../../src/components/login/LoginForm';

chai.should();

const mockStore = configureMockStore();

const store = mockStore({
  login: Immutable.Map(),
});

const expectedClassName = 'cspace-ui-LoginForm--common';

describe('LoginForm', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a div', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <LoginForm />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <LoginForm />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should show renew prompt when isLoginExpired is true', function test() {
    render(
      <IntlProvider locale="en">
        <StoreProvider store={store}>
          <Router>
            <LoginForm isLoginExpired showPrompt username="admin@core.collectionspace.org" />
          </Router>
        </StoreProvider>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('p').textContent.should.contain('renew');
  });
});
