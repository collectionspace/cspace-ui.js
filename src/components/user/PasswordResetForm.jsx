import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import { components as inputComponents } from 'cspace-input';
import Notification from '../notification/Notification';
import getErrorDescription from '../../helpers/getErrorDescription';
import { isValidPassword } from '../../helpers/validationHelpers';

import {
  ERR_MISSING_PW,
  ERR_MISSING_PW_CONFIRM,
  ERR_INVALID_PW,
  ERR_PW_NOT_CONFIRMED,
} from '../../constants/errorCodes';

const { Button, PasswordInput } = inputComponents;

const messages = defineMessages({
  prompt: {
    id: 'passwordResetForm.prompt',
    description: 'The prompt displayed on the password reset form.',
    defaultMessage: 'Enter the new password for this account.',
  },
  password: {
    id: 'passwordResetForm.password',
    description: 'Label for the password field on the password reset form.',
    defaultMessage: 'Password',
  },
  confirmPassword: {
    id: 'passwordResetForm.confirmPassword',
    description: 'Label for the confirm password field on the password reset form.',
    defaultMessage: 'Confirm password',
  },
  submit: {
    id: 'passwordResetForm.submit',
    description: 'Label for the submit button on the password reset form.',
    defaultMessage: 'Submit',
  },
  success: {
    id: 'passwordResetForm.success',
    description: 'Message displayed when a password reset has been successfully completed.',
    defaultMessage: 'Your password has been reset. {loginLink} to continue.',
  },
  loginLink: {
    id: 'passwordResetForm.loginLink',
    description: 'Text of the link to the login page displayed after a password has been reset.',
    defaultMessage: 'Sign in',
  },
  newRequestLink: {
    id: 'passwordResetForm.newRequestLink',
    description: 'Text of the link to make a new password reset request, displayed in the error message when a token is invalid or has expired.',
    defaultMessage: 'make a new request',
  },
  error: {
    id: 'passwordResetForm.error',
    description: 'Generic message to display when a password reset fails, and no more specific message is available.',
    defaultMessage: 'An error occurred while attempting to reset the password: {detail}',
  },
  errorMissingPassword: {
    id: 'passwordResetForm.errorMissingPassword',
    description: 'Message to display when no password is entered on the password reset form.',
    defaultMessage: 'Please enter a new password.',
  },
  errorMissingConfirmation: {
    id: 'passwordResetForm.errorMissingConfirmation',
    description: 'Message to display when no password confirmation is entered on the password reset form.',
    defaultMessage: 'Please confirm the new password.',
  },
  errorNotConfirmed: {
    id: 'passwordResetForm.errorNotConfirmed',
    description: 'Message to display when the password confirmation does not match the password on the password reset form.',
    defaultMessage: 'The password was not correctly confirmed.',
  },
  errorInvalidPassword: {
    id: 'passwordResetForm.errorInvalidPassword',
    description: 'Message to display when the password is invalid on the password reset form.',
    defaultMessage: 'The password must be between 8 and 24 characters.',
  },
  errorTokenExpired: {
    id: 'passwordResetForm.errorTokenExpired',
    description: 'Message to display when the password reset token has expired on the password reset form.',
    defaultMessage: 'The password reset request has expired. Please {newRequestLink} to reset your password.',
  },
  errorTokenInvalid: {
    id: 'passwordResetForm.errorTokenInvalid',
    description: 'Message to display when the password reset token is invalid on the password reset form.',
    defaultMessage: 'The password reset request could not be validated. Please {newRequestLink} to reset your password.',
  },
});

const propTypes = {
  token: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
};

const contextTypes = {
  intl: intlShape,
};

export default class PasswordResetForm extends Component {
  constructor() {
    super();

    this.handleConfirmPasswordCommit = this.handleConfirmPasswordCommit.bind(this);
    this.handlePasswordCommit = this.handlePasswordCommit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
  }

  handleConfirmPasswordCommit(path, value) {
    this.setState({
      confirmPassword: value,
    });
  }

  handlePasswordCommit(path, value) {
    this.setState({
      password: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      password,
      confirmPassword,
    } = this.state;

    if (!password) {
      this.setState({
        error: {
          code: ERR_MISSING_PW,
        },
      });

      return;
    }

    if (!confirmPassword) {
      this.setState({
        error: {
          code: ERR_MISSING_PW_CONFIRM,
        },
      });

      return;
    }

    if (password !== confirmPassword) {
      this.setState({
        error: {
          code: ERR_PW_NOT_CONFIRMED,
        },
      });

      return;
    }

    if (!isValidPassword(password)) {
      this.setState({
        error: {
          code: ERR_INVALID_PW,
        },
      });

      return;
    }

    const {
      reset,
      token,
    } = this.props;

    this.setState({
      error: null,
      isPending: true,
      isSuccess: false,
    });

    reset(password, token)
      .then(() => {
        this.setState({
          error: null,
          isPending: false,
          isSuccess: true,
        });
      })
      .catch((error) => {
        this.setState({
          error,
          isPending: false,
          isSuccess: false,
        });
      });
  }

  renderError() {
    const {
      error,
    } = this.state;

    const {
      intl,
    } = this.context;

    if (!error) {
      return undefined;
    }

    let message;

    const values = {};

    const {
      code,
    } = error;

    if (code === ERR_MISSING_PW) {
      message = messages.errorMissingPassword;
    } else if (code === ERR_MISSING_PW_CONFIRM) {
      message = messages.errorMissingConfirmation;
    } else if (code === ERR_PW_NOT_CONFIRMED) {
      message = messages.errorNotConfirmed;
    } else if (code === ERR_INVALID_PW) {
      message = messages.errorInvalidPassword;
    } else {
      const statusCode = get(error, ['response', 'status']);

      if (statusCode === 400 || statusCode === 500) {
        const data = get(error, ['response', 'data']);

        if (/token .* not valid/.test(data)) {
          message = messages.errorTokenInvalid;

          values.newRequestLink = (
            <Link to="/resetpw">{intl.formatMessage(messages.newRequestLink)}</Link>
          );
        } else if (/token .* expired/.test(data)) {
          message = messages.errorTokenExpired;

          values.newRequestLink = (
            <Link to="/resetpw">{intl.formatMessage(messages.newRequestLink)}</Link>
          );
        }
      }
    }

    if (!message) {
      message = messages.error;
      values.detail = getErrorDescription(error);
    }

    return (
      <Notification
        id="passwordResetForm.error"
        items={[{
          message,
          values,
        }]}
        showCloseButton={false}
        status="error"
      />
    );
  }

  render() {
    const {
      isPending,
      isSuccess,
      password,
      confirmPassword,
    } = this.state;

    const {
      intl,
    } = this.context;

    const errorMessage = this.renderError();

    if (isSuccess) {
      const loginLink = <Link to="/login">{intl.formatMessage(messages.loginLink)}</Link>;

      return (
        <FormattedMessage {...messages.success} values={{ loginLink }} />
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <FormattedMessage {...messages.prompt} />
        </p>

        <div>
          <PasswordInput
            autoComplete="new-password"
            name="password"
            placeholder={intl.formatMessage(messages.password)}
            value={password}
            onCommit={this.handlePasswordCommit}
          />
        </div>

        <div>
          <PasswordInput
            autoComplete="new-password"
            name="confirmPassword"
            placeholder={intl.formatMessage(messages.confirmPassword)}
            value={confirmPassword}
            onCommit={this.handleConfirmPasswordCommit}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          <FormattedMessage {...messages.submit} />
        </Button>

        {errorMessage}
      </form>
    );
  }
}

PasswordResetForm.propTypes = propTypes;
PasswordResetForm.contextTypes = contextTypes;
