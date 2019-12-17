/* global document */

import React from 'react';
import { findRenderedComponentWithType, Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import { render } from 'react-dom';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import { ERR_INVALID_CREDENTIALS } from '../../../../src/constants/errorCodes';
import createTestContainer from '../../../helpers/createTestContainer';
import LoginForm from '../../../../src/components/login/LoginForm';

const { expect } = chai;

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

  it('should show the header when showHeader is true', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            showHeader
          />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('h2').should.not.equal(null);
  });

  it('should not show the header when showHeader is false', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            showHeader={false}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    expect(this.container.querySelector('h2')).to.equal(null);
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
      </IntlProvider>, this.container,
    );

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.pending']);
  });

  it('should show success message when isSuccess is true', function test() {
    const messages = {
      'loginForm.success': 'this is the success message',
    };

    render(
      <IntlProvider
        locale="en"
        messages={messages}
      >
        <Router>
          <LoginForm isSuccess username="admin@core.collectionspace.org" />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.success']);
  });

  it('should show expired message when isExpired is true', function test() {
    const messages = {
      'loginForm.expiredPrompt': 'this is the expired message',
    };

    render(
      <IntlProvider
        locale="en"
        messages={messages}
      >
        <Router>
          <LoginForm isExpired username="admin@core.collectionspace.org" />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.expiredPrompt']);
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
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-Notification--common').textContent.should
      .equal(messages['loginForm.error']);
  });

  it('should translate the bad credentials error', function test() {
    const messages = {
      'loginForm.ERR_INVALID_CREDENTIALS': 'this is the bad credentials error message',
    };

    const error = Immutable.fromJS({
      code: ERR_INVALID_CREDENTIALS,
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
      </IntlProvider>, this.container,
    );

    this.container.querySelector('.cspace-ui-Notification--common').textContent.should
      .equal(messages['loginForm.ERR_INVALID_CREDENTIALS']);
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
      </IntlProvider>, this.container,
    );

    const form = this.container.querySelector('form');
    const username = 'user@collectionspace.org';
    const password = 'topsecret';

    this.container.querySelector('#username').value = username;
    this.container.querySelector('#password').value = password;

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
      </IntlProvider>, this.container,
    );

    const form = this.container.querySelector('form');

    Simulate.submit(form);
  });

  it('should call onSuccess when isSuccess changes from false to true', function test() {
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
            onSuccess={handleSuccess}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    handlerCalled.should.equal(false);

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            isSuccess
            onSuccess={handleSuccess}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    handlerCalled.should.equal(true);
  });

  it('should call focus the password input when the username changes from blank to non-blank', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm />
        </Router>
      </IntlProvider>, this.container,
    );

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            username="user@collectionspace.org"
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const passwordInput = this.container.querySelector('#password');

    document.activeElement.should.equal(passwordInput);
  });

  it('should call focus the password input when error changes from falsy to truthy', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm />
        </Router>
      </IntlProvider>, this.container,
    );

    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm
            error={Immutable.Map()}
          />
        </Router>
      </IntlProvider>, this.container,
    );

    const passwordInput = this.container.querySelector('#password');

    document.activeElement.should.equal(passwordInput);
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
      </IntlProvider>, this.container,
    );

    const usernameInput = this.container.querySelector('#username');

    usernameInput.value = username;

    Simulate.change(usernameInput);

    const link = findRenderedComponentWithType(renderTree, Link);

    link.props.to.state.username.should.equal(username);
  });

  it('should show the forgot password link when showForgotLink is true', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm showForgotLink username="admin@core.collectionspace.org" />
        </Router>
      </IntlProvider>, this.container,
    );

    this.container.querySelector('a').should.not.equal(null);
  });

  it('should not show the forgot password link when showForgotLink is false', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <Router>
          <LoginForm showForgotLink={false} username="admin@core.collectionspace.org" />
        </Router>
      </IntlProvider>, this.container,
    );

    expect(this.container.querySelector('a')).to.equal(null);
  });
});
