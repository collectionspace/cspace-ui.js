/* global window, btoa, FormData */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

import { isValidPassword } from '../../../helpers/passwordHelpers';

const messages = defineMessages({
  title: {
    id: 'passwordResetPage.title',
    description: 'Title of the password reset page.',
    defaultMessage: 'Reset Password',
  },
  prompt: {
    id: 'passwordResetPage.prompt',
    description: 'The prompt displayed on the password reset page.',
    defaultMessage: 'Enter the new password for this account.',
  },
  password: {
    id: 'passwordResetPage.password',
    description: 'Label for the password field on the password reset page.',
    defaultMessage: 'Password',
  },
  confirmPassword: {
    id: 'passwordResetPage.confirmPassword',
    description: 'Label for the confirm password field on the password reset page.',
    defaultMessage: 'Confirm password',
  },
  submit: {
    id: 'passwordResetPage.submit',
    description: 'Label for the submit button on the password reset page.',
    defaultMessage: 'Submit',
  },
  errorMissingPassword: {
    id: 'passwordResetPage.errorMissingPassword',
    description: 'Message to display when no password is entered on the password reset page.',
    defaultMessage: 'Please enter a new password.',
  },
  errorNotConfirmed: {
    id: 'passwordResetPage.errorNotConfirmed',
    description: 'Message to display when the password confirmation does not match the password on the password reset page.',
    defaultMessage: 'The password was not correctly confirmed. Please re-enter the new password in the confirm password field.',
  },
  errorInvalidPassword: {
    id: 'passwordResetPage.errorInvalidPassword',
    description: 'Message to display when the password is invalid on the password reset page.',
    defaultMessage: 'The password must be between 8 and 24 characters.',
  },
  success: {
    id: 'passwordResetPage.success',
    description: 'Message displayed when a password reset has been successfully completed.',
    defaultMessage: 'Your password has been reset. {loginLink} to continue.',
  },
  loginLink: {
    id: 'passwordResetPage.loginLink',
    description: 'Text of the link to the login page displayed after a password has been reset.',
    defaultMessage: 'Sign in',
  },
  newRequestLink: {
    id: 'passwordResetPage.newRequestLink',
    description: 'Text of the link to make a new password reset request, displayed in the error message when a token is invalid or has expired.',
    defaultMessage: 'make a new request',
  },
  error: {
    id: 'passwordResetPage.error',
    description: 'Generic message to display when a password reset fails, and no more specific message is available.',
    defaultMessage: 'An error occurred while attempting to reset the password: {detail}',
  },
  errorTokenExpired: {
    id: 'passwordResetPage.errorTokenExpired',
    description: 'Message to display when the password reset token has expired on the password reset page.',
    defaultMessage: 'The password reset request has expired. Please {newRequestLink} to reset your password.',
  },
  errorTokenInvalid: {
    id: 'passwordResetPage.errorTokenInvalid',
    description: 'Message to display when the password reset token is invalid on the password reset page.',
    defaultMessage: 'The password reset request could not be validated. Please {newRequestLink} to reset your password.',
  },
});

const propTypes = {
  csrf: PropTypes.object,
  intl: intlShape.isRequired,
  tenantId: PropTypes.string,
  tenantLoginUrl: PropTypes.string,
  token: PropTypes.string.isRequired,
};

const defaultProps = {
  csrf: null,
  tenantId: null,
  // If we don't receive a tenant-specific login URL, default to the services login page.
  tenantLoginUrl: '/cspace-services/login',
};

function PasswordResetPage(props) {
  const {
    csrf,
    intl,
    tenantId,
    tenantLoginUrl,
    token,
  } = props;

  const [error, setError] = useState();
  const [isPending, setPending] = useState();
  const [success, setSuccess] = useState();

  if (success) {
    return (
      <p className="status success">{success}</p>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (!password) {
      setError(<FormattedMessage {...messages.errorMissingPassword} />);

      return;
    }

    if (!isValidPassword(password)) {
      setError(<FormattedMessage {...messages.errorInvalidPassword} />);

      return;
    }

    if (password !== confirmPassword) {
      setError(<FormattedMessage {...messages.errorNotConfirmed} />);

      return;
    }

    const url = new URL(form.action);
    const params = url.searchParams;

    params.delete('token');

    if (csrf) {
      params.set(csrf.parameterName, csrf.token);
    }

    const payload = {
      'ns2:passwordreset': {
        '@xmlns:ns2': 'http://collectionspace.org/services/authentication',
        token,
        password: btoa(password),
      },
    };

    setError(null);
    setPending(true);

    window.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => Promise.all([response, response.text()]))
      .then(([response, text]) => {
        if (response.ok) {
          setError(null);

          const loginLink = (
            <a href={tenantLoginUrl}>
              <FormattedMessage {...messages.loginLink} />
            </a>
          );

          setSuccess(<FormattedMessage {...messages.success} values={{ loginLink }} />);
        } else {
          setSuccess(null);

          const { status } = response;
          const tidParam = tenantId ? `?tid=${tenantId}` : '';

          const values = {
            detail: text,
            newRequestLink: (
              <a href={`./requestpasswordreset${tidParam}`}>
                <FormattedMessage {...messages.newRequestLink} />
              </a>
            ),
          };

          let message = null;

          if (status === 400 || status === 500) {
            if (/token .* not valid/.test(text)) {
              message = messages.errorTokenInvalid;
            } else if (/token .* expired/.test(text)) {
              message = messages.errorTokenExpired;
            }
          }

          if (!message) {
            message = messages.error;
          }

          setError(<FormattedMessage {...message} values={values} />);
        }
      })
      .catch((err) => {
        setError(<FormattedMessage {...messages.error} values={{ detail: err.message }} />);
      })
      .finally(() => {
        setPending(false);
      });
  };

  const errorMessage = error
    ? <p className="status error">{error}</p>
    : undefined;

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.title)}</title>
      </Helmet>

      {errorMessage}

      <main>
        <p><FormattedMessage {...messages.prompt} /></p>

        <form method="POST" onSubmit={handleSubmit}>
          <div>
            {/* Ignore an eslint misfire. */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <FormattedMessage {...messages.password} />

              <input
                autoComplete="new-password"
                name="password"
                type="password"
              />
            </label>
          </div>

          <div>
            {/* Ignore an eslint misfire. */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <FormattedMessage {...messages.confirmPassword} />

              <input
                autoComplete="new-password"
                name="confirmPassword"
                type="password"
              />
            </label>
          </div>

          <div>
            <button className="reset" disabled={isPending} type="submit">
              <FormattedMessage {...messages.submit} />
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

PasswordResetPage.propTypes = propTypes;
PasswordResetPage.defaultProps = defaultProps;

export default injectIntl(PasswordResetPage);
