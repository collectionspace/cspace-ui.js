import React from 'react';
import { findRenderedComponentWithType, Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { render } from 'react-dom';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import createTestContainer from '../../../helpers/createTestContainer';
import LoginForm from '../../../../src/components/login/LoginForm';

chai.should();

const expectedClassName = 'cspace-ui-LoginForm--common';

describe('LoginForm', function suite() {
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
      </IntlProvider>, this.container);

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
      </IntlProvider>, this.container);

    this.container.firstElementChild.className.should.equal(expectedClassName);
  });

  it('should show pending message when isPending is true', function test() {
    const messages = {
      'loginForm.pending': 'this is the pending message',
    };

    render(
      <IntlProvider
        locale="en"
        messages={messages}
      >
        <Router>
          <LoginForm
            isPending
          />
        </Router>
      </IntlProvider>, this.container);

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.pending']);
  });

  it('should show success message when isPending is false, no error is provided, and a username is present', function test() {
    const messages = {
      'loginForm.success': 'this is the success message',
    };

    render(
      <IntlProvider
        locale="en"
        messages={messages}
      >
        <Router>
          <LoginForm username="admin@core.collectionspace.org" />
        </Router>
      </IntlProvider>, this.container);

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.success']);
  });

  it('should show error message when error is provided', function test() {
    const messages = {
      'loginForm.error': 'this is the error message',
    };

    const error = Immutable.Map();

    render(
      <IntlProvider
        locale="en"
        messages={messages}
      >
        <Router>
          <LoginForm
            error={error}
          />
        </Router>
      </IntlProvider>, this.container);

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.error']);
  });

  it('should translate the bad credentials error', function test() {
    const messages = {
      'loginForm.error.badCredentials': 'this is the bad credentials error message',
    };

    const error = Immutable.fromJS({
      response: {
        data: {
          error_description: 'Bad credentials',
        },
      },
    });

    render(
      <IntlProvider
        locale="en"
        messages={messages}
      >
        <Router>
          <LoginForm
            error={error}
          />
        </Router>
      </IntlProvider>, this.container);

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.error.badCredentials']);
  });

  it('should call login when the form is submitted', function test() {
    let loginUsername = null;
    let loginPassword = null;

    const login = (configArg, usernameArg, passwordArg) => {
      loginUsername = usernameArg;
      loginPassword = passwordArg;
    };

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            login={login}
          />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const username = 'user@collectionspace.org';
    const password = 'topsecret';

    this.container.querySelector('input[name="username"]').value = username;
    this.container.querySelector('input[name="password"]').value = password;

    Simulate.submit(form);

    loginUsername.should.equal(username);
    loginPassword.should.equal(password);
  });

  it('should do nothing when the form is submitted if login is not set', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');

    Simulate.submit(form);
  });

  it('should call onSuccess when isPending changes from true to false and there is no error', function test() {
    let handlerCalled = false;

    const handleSuccess = () => {
      handlerCalled = true;
    };

    // Initial render - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            isPending
            onSuccess={handleSuccess}
          />
        </Router>
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change isPending to false, but with an error - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            error={Immutable.Map()}
            onSuccess={handleSuccess}
          />
        </Router>
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change isPending from false to true - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            isPending
            onSuccess={handleSuccess}
          />
        </Router>
      </IntlProvider>, this.container);

    // Change isPending to false, with no error - onSuccess should be called

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            onSuccess={handleSuccess}
          />
        </Router>
      </IntlProvider>, this.container);

    handlerCalled.should.equal(true);

    // Reset handler called flag

    handlerCalled = false;

    // isPending stays false - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            onSuccess={handleSuccess}
          />
        </Router>
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change isPending from false to true - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            isPending
            onSuccess={handleSuccess}
          />
        </Router>
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change isPending to false, with no error, but no onSuccess - handler should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm />
        </Router>
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);
  });

  it('should update the location state of the reset password link when the username changes', function test() {
    const username = 'admin@core.collectionspace.org';

    const renderTree = render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm />
        </Router>
      </IntlProvider>, this.container);

    const usernameInput = this.container.querySelector('input[name="username"]');

    usernameInput.value = username;

    Simulate.change(usernameInput);

    const link = findRenderedComponentWithType(renderTree, Link);

    link.props.to.state.username.should.equal(username);
  });
});
