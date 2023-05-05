/* global window */

import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import createTestContainer from '../../../helpers/createTestContainer';
import { render } from '../../../helpers/renderHelpers';
import PasswordResetRequestForm from '../../../../src/components/user/PasswordResetRequestForm';

const { expect } = chai;

chai.should();

describe('PasswordResetRequestForm', () => {
  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render as a form', function test() {
    const requestReset = () => {};

    render(
      <IntlProvider locale="en">
        <PasswordResetRequestForm requestReset={requestReset} />
      </IntlProvider>, this.container,
    );

    this.container.firstElementChild.nodeName.should.equal('FORM');
  });

  it('should call requestReset when the form is submitted', function test() {
    let requestResetEmail = null;

    const requestReset = (emailArg) => {
      requestResetEmail = emailArg;

      return Promise.resolve();
    };

    render(
      <IntlProvider locale="en">
        <PasswordResetRequestForm requestReset={requestReset} />
      </IntlProvider>, this.container,
    );

    const form = this.container.querySelector('form');
    const emailInput = this.container.querySelector('input[type="text"]');

    const email = 'user@collectionspace.org';

    emailInput.value = email;

    Simulate.blur(emailInput);
    Simulate.submit(form);

    requestResetEmail.should.equal(email);
  });

  it('should show an error notification when no email is supplied', function test() {
    const requestReset = () => {};

    render(
      <IntlProvider locale="en">
        <PasswordResetRequestForm requestReset={requestReset} />
      </IntlProvider>, this.container,
    );

    const form = this.container.querySelector('form');

    Simulate.submit(form);

    this.container.querySelector('.cspace-ui-Notification--common').textContent.should
      .equal('Please enter an email address.');
  });

  it('should show an error notification when the email is not a valid email address', function test() {
    const requestReset = () => {};

    render(
      <IntlProvider locale="en">
        <PasswordResetRequestForm requestReset={requestReset} />
      </IntlProvider>, this.container,
    );

    const form = this.container.querySelector('form');
    const emailInput = this.container.querySelector('input[type="text"]');

    const email = 'invalid.email';

    emailInput.value = email;

    Simulate.blur(emailInput);
    Simulate.submit(form);

    this.container.querySelector('.cspace-ui-Notification--common').textContent.should
      .equal(`${email} is not a valid email address.`);
  });

  it('should show an error notification when no account is found with the email address', function test() {
    const error = new Error();

    error.response = {
      status: 404,
    };

    const requestReset = () => Promise.reject(error);

    render(
      <IntlProvider locale="en">
        <PasswordResetRequestForm requestReset={requestReset} />
      </IntlProvider>, this.container,
    );

    const form = this.container.querySelector('form');
    const emailInput = this.container.querySelector('input[type="text"]');

    const email = 'user@collectionspace.org';

    emailInput.value = email;

    Simulate.blur(emailInput);
    Simulate.submit(form);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelector('.cspace-ui-Notification--common').textContent.should
          .equal(`Could not locate an account associated with the email ${email}.`);

        resolve();
      }, 0);
    });
  });

  it('should show a generic error notification when an error occurs that is not specifically handled', function test() {
    const requestReset = () => Promise.reject(new Error('The underlying error message.'));

    render(
      <IntlProvider locale="en">
        <PasswordResetRequestForm requestReset={requestReset} />
      </IntlProvider>, this.container,
    );

    const form = this.container.querySelector('form');
    const emailInput = this.container.querySelector('input[type="text"]');

    const email = 'user@collectionspace.org';

    emailInput.value = email;

    Simulate.blur(emailInput);
    Simulate.submit(form);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        this.container.querySelector('.cspace-ui-Notification--common').textContent.should
          .equal('An error occurred while attempting to request the password reset: The underlying error message.');

        resolve();
      }, 0);
    });
  });

  it('should render a success message instead of a form when a reset request succeeds', function test() {
    const requestReset = () => Promise.resolve();

    render(
      <IntlProvider locale="en">
        <PasswordResetRequestForm requestReset={requestReset} />
      </IntlProvider>, this.container,
    );

    const form = this.container.querySelector('form');
    const emailInput = this.container.querySelector('input[type="text"]');

    const email = 'user@collectionspace.org';

    emailInput.value = email;

    Simulate.blur(emailInput);
    Simulate.submit(form);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        expect(this.container.querySelector('form')).to.equal(null);

        this.container.textContent.should.contain(`An email has been sent to ${email}.`);

        resolve();
      }, 0);
    });
  });
});
