/* global window */

import React from 'react';
import { render } from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import { MemoryRouter as Router } from 'react-router';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import PasswordResetForm from '../../../../src/components/user/PasswordResetForm';

const expect = chai.expect;

chai.should();

describe('PasswordResetForm', function suite() {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a form', function test() {
    const reset = () => {};

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    this.container.firstElementChild.nodeName.should.equal('FORM');
  });

  it('should call reset when the form is submitted', function test() {
    let resetPassword = null;

    const reset = (passwordArg) => {
      resetPassword = passwordArg;

      return Promise.resolve();
    };

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const passwordInput = this.container.querySelector('input[name="password"]');
    const confirmPasswordInput = this.container.querySelector('input[name="confirmPassword"]');

    const password = 'topsecret';

    passwordInput.value = password;

    Simulate.blur(passwordInput);

    confirmPasswordInput.value = password;

    Simulate.blur(confirmPasswordInput);

    Simulate.submit(form);

    resetPassword.should.equal(password);
  });

  it('should show an error notification when no password is supplied', function test() {
    const reset = () => {};

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');

    Simulate.submit(form);

    this.container.querySelector('.cspace-ui-Notification--common').textContent.should
      .equal('Please enter a new password.');
  });

  it('should show an error notification when no password confirmation is supplied', function test() {
    const reset = () => {};

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const passwordInput = this.container.querySelector('input[name="password"]');

    passwordInput.value = 'topsecret';

    Simulate.blur(passwordInput);

    Simulate.submit(form);

    this.container.querySelector('.cspace-ui-Notification--common').textContent.should
      .equal('Please confirm the new password.');
  });

  it('should show an error notification when the password differs from the password confirmation', function test() {
    const reset = () => {};

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const passwordInput = this.container.querySelector('input[name="password"]');
    const confirmPasswordInput = this.container.querySelector('input[name="confirmPassword"]');

    passwordInput.value = 'topsecret';

    Simulate.blur(passwordInput);

    confirmPasswordInput.value = 'uh oh';

    Simulate.blur(confirmPasswordInput);

    Simulate.submit(form);

    this.container.querySelector('.cspace-ui-Notification--common').textContent.should
      .equal('The password was not correctly confirmed.');
  });

  it('should show an error notification when the password is too short', function test() {
    const reset = () => {};

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const passwordInput = this.container.querySelector('input[name="password"]');
    const confirmPasswordInput = this.container.querySelector('input[name="confirmPassword"]');

    const password = 'nope';

    passwordInput.value = password;

    Simulate.blur(passwordInput);

    confirmPasswordInput.value = password;

    Simulate.blur(confirmPasswordInput);

    Simulate.submit(form);

    this.container.querySelector('.cspace-ui-Notification--common').textContent.should
      .equal('The password must be between 8 and 24 characters.');
  });

  it('should show an error notification when the password is too long', function test() {
    const reset = () => {};

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const passwordInput = this.container.querySelector('input[name="password"]');
    const confirmPasswordInput = this.container.querySelector('input[name="confirmPassword"]');

    const password = 'this is a very long password that exceeds the length limit';

    passwordInput.value = password;

    Simulate.blur(passwordInput);

    confirmPasswordInput.value = password;

    Simulate.blur(confirmPasswordInput);

    Simulate.submit(form);

    this.container.querySelector('.cspace-ui-Notification--common').textContent.should
      .equal('The password must be between 8 and 24 characters.');
  });

  it('should show an error notification when the token is invalid', function test() {
    const reset = () => Promise.reject({
      response: {
        status: 400,
        data: 'The token \'1234\' is not valid or does not exist.',
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const passwordInput = this.container.querySelector('input[name="password"]');
    const confirmPasswordInput = this.container.querySelector('input[name="confirmPassword"]');

    const password = 'topsecret';

    passwordInput.value = password;

    Simulate.blur(passwordInput);

    confirmPasswordInput.value = password;

    Simulate.blur(confirmPasswordInput);

    Simulate.submit(form);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelector('.cspace-ui-Notification--common').textContent.should
          .contain('The password reset request could not be validated.');

        resolve();
      }, 0);
    });
  });

  it('should show an error notification when the token is expired', function test() {
    const reset = () => Promise.reject({
      response: {
        status: 500,
        data: 'Could not reset password using token with ID=\'1234\'. Password reset token has expired.',
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const passwordInput = this.container.querySelector('input[name="password"]');
    const confirmPasswordInput = this.container.querySelector('input[name="confirmPassword"]');

    const password = 'topsecret';

    passwordInput.value = password;

    Simulate.blur(passwordInput);

    confirmPasswordInput.value = password;

    Simulate.blur(confirmPasswordInput);

    Simulate.submit(form);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelector('.cspace-ui-Notification--common').textContent.should
          .contain('The password reset request has expired.');

        resolve();
      }, 0);
    });
  });

  it('should show a generic error notification when an error occurs that is not specifically handled', function test() {
    const reset = () => Promise.reject({
      response: {
        status: 400,
        data: 'The underlying error message.',
      },
    });

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const passwordInput = this.container.querySelector('input[name="password"]');
    const confirmPasswordInput = this.container.querySelector('input[name="confirmPassword"]');

    const password = 'topsecret';

    passwordInput.value = password;

    Simulate.blur(passwordInput);

    confirmPasswordInput.value = password;

    Simulate.blur(confirmPasswordInput);

    Simulate.submit(form);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelector('.cspace-ui-Notification--common').textContent.should
          .equal('An error occurred while attempting to reset the password: The underlying error message.');

        resolve();
      }, 0);
    });
  });

  it('should render a success message instead of a form when a reset request succeeds', function test() {
    const reset = () => Promise.resolve();

    render(
      <IntlProvider locale="en">
        <Router>
          <PasswordResetForm reset={reset} token="1234" />
        </Router>
      </IntlProvider>, this.container);

    const form = this.container.querySelector('form');
    const passwordInput = this.container.querySelector('input[name="password"]');
    const confirmPasswordInput = this.container.querySelector('input[name="confirmPassword"]');

    const password = 'topsecret';

    passwordInput.value = password;

    Simulate.blur(passwordInput);

    confirmPasswordInput.value = password;

    Simulate.blur(confirmPasswordInput);

    Simulate.submit(form);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        expect(this.container.querySelector('form')).to.equal(null);

        this.container.textContent.should.contain('Your password has been reset.');

        resolve();
      }, 0);
    });
  });
});
