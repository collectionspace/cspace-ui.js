/* global window, FormData */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

import { isValidEmail } from '../../../helpers/validationHelpers';

const messages = defineMessages({
  title: {
    id: 'PasswordResetRequestPage.title',
    description: 'Title of the password reset request page.',
    defaultMessage: 'Reset Password',
  },
  prompt: {
    id: 'PasswordResetRequestPage.prompt',
    description: 'The prompt displayed on the password reset request page.',
    defaultMessage: 'Please enter your email address to request a password reset.',
  },
  email: {
    id: 'PasswordResetRequestPage.email',
    description: 'Label for the email field on the password reset request page.',
    defaultMessage: 'Email',
  },
  submit: {
    id: 'PasswordResetRequestPage.submit',
    description: 'Label for the submit button on the password reset request page.',
    defaultMessage: 'Submit',
  },
  success: {
    id: 'PasswordResetRequestPage.success',
    description: 'Message displayed when a password reset has been successfully requested.',
    defaultMessage: 'An email has been sent to {email}. Follow the instructions in the email to finish resetting your password.',
  },
  error: {
    id: 'PasswordResetRequestPage.error',
    description: 'Generic message to display when a password reset request fails, and no more specific message is available.',
    defaultMessage: 'An error occurred while attempting to request the password reset: {detail}',
  },
  errorNotFound: {
    id: 'PasswordResetRequestPage.errorNotFound',
    description: 'Message to display when the email is not found for a password reset request.',
    defaultMessage: 'Could not find an account with the email {email}.',
  },
  errorMissingEmail: {
    id: 'PasswordResetRequestPage.errorMissingEmail',
    description: 'Message to display when no email is entered on the password reset request page.',
    defaultMessage: 'Please enter an email address.',
  },
  errorInvalidEmail: {
    id: 'PasswordResetRequestPage.errorInvalidEmail',
    description: 'Message to display when the email entered on the password reset request page is not a valid email address.',
    defaultMessage: '{email} is not a valid email address.',
  },
});

const propTypes = {
  csrf: PropTypes.object,
  tenantId: PropTypes.string,
  intl: intlShape.isRequired,
};

const defaultProps = {
  csrf: null,
  tenantId: null,
};

function PasswordResetRequestPage(props) {
  const {
    csrf,
    intl,
    tenantId,
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
    const email = formData.get('email');

    if (!email) {
      setError(<FormattedMessage {...messages.errorMissingEmail} />);

      return;
    }

    if (!isValidEmail(email)) {
      setError(<FormattedMessage {...messages.errorInvalidEmail} values={{ email }} />);

      return;
    }

    const url = new URL(form.action);
    const params = url.searchParams;

    if (tenantId) {
      params.set('tid', tenantId);
    }

    params.set('email', email);

    if (csrf) {
      params.set(csrf.parameterName, csrf.token);
    }

    setError(null);
    setPending(true);

    window.fetch(url, {
      method: 'POST',
    })
      .then((response) => Promise.all([response, response.text()]))
      .then(([response, text]) => {
        if (response.ok) {
          setSuccess(<FormattedMessage {...messages.success} values={{ email: text }} />);
          setError(null);
        } else {
          setSuccess(null);

          if (response.status === 404) {
            setError(<FormattedMessage {...messages.errorNotFound} values={{ email }} />);
          } else {
            setError(<FormattedMessage {...messages.error} values={{ detail: text }} />);
          }
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
              <FormattedMessage {...messages.email} />

              <input
                autoComplete="email"
                name="email"
                type="text"
              />
            </label>
          </div>

          <div>
            <button className="send" disabled={isPending} type="submit">
              <FormattedMessage {...messages.submit} />
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

PasswordResetRequestPage.propTypes = propTypes;
PasswordResetRequestPage.defaultProps = defaultProps;

export default injectIntl(PasswordResetRequestPage);
