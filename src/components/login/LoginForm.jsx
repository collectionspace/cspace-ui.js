import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/LoginForm.css';

const { Button, LineInput, PasswordInput } = inputComponents;

const messages = defineMessages({
  title: {
    id: 'loginForm.title',
    description: 'Title displayed above the login form.',
    defaultMessage: 'Sign In',
  },
  prompt: {
    id: 'loginForm.prompt',
    description: 'The login prompt displayed when there are no errors.',
    defaultMessage: 'Please sign in to continue.',
  },
  pending: {
    id: 'loginForm.pending',
    description: 'Message displayed while login is in progress.',
    defaultMessage: 'Signing in...',
  },
  success: {
    id: 'loginForm.success',
    description: 'Message displayed when login completes successfully.',
    defaultMessage: 'Sign in complete.',
  },
  error: {
    id: 'loginForm.error',
    description: 'Generic error message displayed when a more specific error message is not available.',
    defaultMessage: 'Sign in failed.',
  },
  badCredentialsError: {
    id: 'loginForm.error.badCredentials',
    description: 'Error message displayed when incorrect credentials were entered.',
    defaultMessage: 'Sign in failed. Incorrect username/password.',
  },
  networkError: {
    id: 'loginForm.error.networkError',
    description: 'Error message displayed when there is a network error during login.',
    defaultMessage: 'Sign in failed. Unable to reach the CollectionSpace server.',
  },
  username: {
    id: 'loginForm.label.username',
    description: 'Label for the username field.',
    defaultMessage: 'Email',
  },
  password: {
    id: 'loginForm.label.password',
    description: 'Label for the password field.',
    defaultMessage: 'Password',
  },
  submit: {
    id: 'loginForm.label.submit',
    description: 'Label for the submit button.',
    defaultMessage: 'Sign in',
  },
});

/**
 * Map client error descriptions to keys in the above messages object.
 */
const errorMessageMap = {
  'Bad credentials': 'badCredentialsError',
  'Network Error': 'networkError',
};

const contextTypes = {
  config: PropTypes.object,
};

const propTypes = {
  intl: PropTypes.object.isRequired,
  isPending: PropTypes.bool,
  username: PropTypes.string,
  error: PropTypes.object,
  login: PropTypes.func,
  onSuccess: PropTypes.func,
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      onSuccess,
      isPending,
      error,
    } = this.props;

    if (onSuccess) {
      const isSuccess = (prevProps.isPending && !isPending && !error);

      if (isSuccess) {
        onSuccess();
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      login,
    } = this.props;

    const {
      config,
    } = this.context;

    if (login) {
      const form = event.target;
      const username = form.username.value;
      const password = form.password.value;

      login(config, username, password);
    }
  }

  renderMessage() {
    const {
      isPending,
      error,
      username,
    } = this.props;

    let messageKey = 'prompt';

    if (isPending) {
      messageKey = 'pending';
    } else if (error) {
      const desc = error.getIn(['response', 'data', 'error_description']);

      if (desc) {
        messageKey = errorMessageMap[desc];
      } else {
        messageKey = errorMessageMap[error.get('message')];
      }

      messageKey = messageKey || 'error';
    } else if (username) {
      messageKey = 'success';
    }

    return (
      <p><FormattedMessage {...messages[messageKey]} /></p>
    );
  }

  renderForm() {
    const {
      intl,
      isPending,
      username,
    } = this.props;

    if (isPending) {
      return null;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <LineInput
          name="username"
          placeholder={intl.formatMessage(messages.username)}
          type="text"
          value={username}
        />
        <PasswordInput
          name="password"
          placeholder={intl.formatMessage(messages.password)}
          type="password"
        />
        <Button type="submit">
          <FormattedMessage {...messages.submit} />
        </Button>
      </form>
    );
  }

  render() {
    return (
      <div className={styles.common}>
        <h2><FormattedMessage {...messages.title} /></h2>
        {this.renderMessage()}
        {this.renderForm()}
      </div>
    );
  }
}

LoginForm.contextTypes = contextTypes;
LoginForm.propTypes = propTypes;

export default injectIntl(LoginForm);
