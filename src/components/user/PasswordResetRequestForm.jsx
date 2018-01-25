import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import Notification from '../notification/Notification';
import getErrorDescription from '../../helpers/getErrorDescription';
import { isValidEmail } from '../../helpers/validationHelpers';

import {
  ERR_INVALID_EMAIL,
  ERR_MISSING_EMAIL,
} from '../../constants/errorCodes';

const { Button, LineInput } = inputComponents;

const messages = defineMessages({
  prompt: {
    id: 'passwordResetRequestForm.prompt',
    description: 'The prompt displayed on the password reset request form.',
    defaultMessage: 'Enter your email address to request a password reset.',
  },
  submit: {
    id: 'passwordResetRequestForm.submit',
    description: 'Label for the submit button on the password reset request form.',
    defaultMessage: 'Submit',
  },
  success: {
    id: 'passwordResetRequestForm.success',
    description: 'Message displayed when a password reset has been successfully requested.',
    defaultMessage: 'An email has been sent to {email}. Follow the instructions in the email to finish resetting your password.',
  },
  error: {
    id: 'passwordResetRequestForm.error',
    description: 'Generic message to display when a password reset request fails, and no more specific message is available.',
    defaultMessage: 'An error occurred while attempting to request the password reset: {detail}',
  },
  errorNotFound: {
    id: 'passwordResetRequestForm.errorNotFound',
    description: 'Message to display when the email is not found for a password reset request.',
    defaultMessage: 'Could not locate an account associated with the email {email}.',
  },
  errorMissingEmail: {
    id: 'passwordResetRequestForm.errorMissingEmail',
    description: 'Message to display when no email is entered on the password reset request form.',
    defaultMessage: 'Please enter an email address.',
  },
  errorInvalidEmail: {
    id: 'passwordResetRequestForm.errorInvalidEmail',
    description: 'Message to display when the email entered on the password reset request form is not a valid email address.',
    defaultMessage: '{email} is not a valid email address.',
  },
});

const propTypes = {
  email: PropTypes.string,
  requestReset: PropTypes.func.isRequired,
};

export default class PasswordResetRequestForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameCommit = this.handleUsernameCommit.bind(this);

    this.state = {
      isPending: false,
      email: props.email,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      email,
    } = this.state;

    if (!email) {
      this.setState({
        error: {
          code: ERR_MISSING_EMAIL,
        },
      });

      return;
    }

    if (!isValidEmail(email)) {
      this.setState({
        error: {
          code: ERR_INVALID_EMAIL,
        },
      });

      return;
    }

    const {
      requestReset,
    } = this.props;

    this.setState({
      error: null,
      isPending: true,
      isSuccess: false,
    });

    requestReset(email)
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

  handleUsernameCommit(path, value) {
    this.setState({
      email: value,
    });
  }

  renderError() {
    const {
      email,
      error,
    } = this.state;

    if (!error) {
      return undefined;
    }

    let message;

    const values = {
      email,
    };

    const {
      code,
    } = error;

    if (code === ERR_INVALID_EMAIL) {
      message = messages.errorInvalidEmail;
    } else if (code === ERR_MISSING_EMAIL) {
      message = messages.errorMissingEmail;
    } else {
      const statusCode = get(error, ['response', 'status']);

      if (statusCode === 404) {
        message = messages.errorNotFound;
      }
    }

    if (!message) {
      message = messages.error;
      values.detail = getErrorDescription(error);
    }

    return (
      <Notification
        id="passwordResetRequestForm.error"
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
      isSuccess,
      isPending,
      email,
    } = this.state;

    if (isSuccess) {
      return (
        <FormattedMessage {...messages.success} values={{ email }} />
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label htmlFor="email">
            <FormattedMessage {...messages.prompt} />
          </label>
        </p>

        <div>
          <LineInput
            autoComplete="email"
            id="email"
            name="email"
            type="text"
            value={email}
            onCommit={this.handleUsernameCommit}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          <FormattedMessage {...messages.submit} />
        </Button>

        {this.renderError()}
      </form>
    );
  }
}

PasswordResetRequestForm.propTypes = propTypes;
