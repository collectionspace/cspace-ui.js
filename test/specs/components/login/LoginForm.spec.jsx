import React from 'react';
import { Simulate } from 'react-addons-test-utils';
import { IntlProvider } from 'react-intl';
import { render } from 'react-dom';
import chai from 'chai';

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
        <LoginForm />
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('DIV');
  });

  it('should render with correct class', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <LoginForm />
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
        <LoginForm
          isPending
        />
      </IntlProvider>, this.container);

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.pending']);
  });

  it('should show success message when response exists', function test() {
    const messages = {
      'loginForm.success': 'this is the success message',
    };

    const response = {};

    render(
      <IntlProvider
        locale="en"
        messages={messages}
      >
        <LoginForm
          response={response}
        />
      </IntlProvider>, this.container);

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.success']);
  });

  it('should show error message when error exists', function test() {
    const messages = {
      'loginForm.error': 'this is the error message',
    };

    const error = {};

    render(
      <IntlProvider
        locale="en"
        messages={messages}
      >
        <LoginForm
          error={error}
        />
      </IntlProvider>, this.container);

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.error']);
  });

  it('should translate the bad credentials error', function test() {
    const messages = {
      'loginForm.error.badCredentials': 'this is the bad credentials error message',
    };

    const error = {
      response: {
        data: {
          error_description: 'Bad credentials',
        },
      },
    };

    render(
      <IntlProvider
        locale="en"
        messages={messages}
      >
        <LoginForm
          error={error}
        />
      </IntlProvider>, this.container);

    this.container.querySelector('div > p').textContent.should
      .equal(messages['loginForm.error.badCredentials']);
  });

  it('should call onSubmit when the form is submitted', function test() {
    let handlerUsername = null;
    let handlerPassword = null;

    const handleSubmit = (username, password) => {
      handlerUsername = username;
      handlerPassword = password;
    };

    render(
      <IntlProvider
        locale="en"
      >
        <LoginForm
          onSubmit={handleSubmit}
        />
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const username = 'user@collectionspace.org';
    const password = 'topsecret';

    this.container.querySelector('input[name="username"]').value = username;
    this.container.querySelector('input[name="password"]').value = password;

    Simulate.submit(form);

    handlerUsername.should.equal(username);
    handlerPassword.should.equal(password);
  });

  it('should do nothing when the form is submitted if onSubmit is not set', function test() {
    render(
      <IntlProvider
        locale="en"
      >
        <LoginForm />
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');

    Simulate.submit(form);
  });

  it('should call onSuccess when isPending changes from true to false and a response exists', function test() {
    let handlerCalled = false;

    const handleSuccess = () => {
      handlerCalled = true;
    };

    // Initial render - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LoginForm
          isPending
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change from isPending to not, but no response - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LoginForm
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change isPending from false to true - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LoginForm
          isPending
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    // Change isPending to false, with response - onSuccess should be called

    const response = {};

    render(
      <IntlProvider
        locale="en"
      >
        <LoginForm
          response={response}
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(true);

    // Reset handler called flag

    handlerCalled = false;

    // isPending stays false - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LoginForm
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change isPending from false to true - onSuccess should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LoginForm
          isPending
          onSuccess={handleSuccess}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);

    // Change isPending to false, with response, but no onSuccess - handler should not be called

    render(
      <IntlProvider
        locale="en"
      >
        <LoginForm
          response={response}
        />
      </IntlProvider>, this.container);

    handlerCalled.should.equal(false);
  });
});
