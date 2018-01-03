import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { components as inputComponents } from 'cspace-input';
import Notification from '../notification/Notification';
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
    description: 'Generic login error message. Displayed when a more specific error message is not available.',
    defaultMessage: 'Sign in failed.',
  },
  badCredentialsError: {
    id: 'loginForm.error.badCredentials',
    description: 'Error message displayed when incorrect credentials were entered during login.',
    defaultMessage: 'Sign in failed. Incorrect username/password.',
  },
  networkError: {
    id: 'loginForm.error.networkError',
    description: 'Error message displayed when there is a network error during login.',
    defaultMessage: 'Sign in failed. Unable to reach the CollectionSpace server.',
  },
  username: {
    id: 'loginForm.username',
    description: 'Label for the login username field.',
    defaultMessage: 'Email',
  },
  password: {
    id: 'loginForm.password',
    description: 'Label for the login password field.',
    defaultMessage: 'Password',
  },
  submit: {
    id: 'loginForm.submit',
    description: 'Label for the login submit button.',
    defaultMessage: 'Sign in',
  },
  forgotPassword: {
    id: 'loginForm.forgotPassword',
    description: 'Text of the forgot password link.',
    defaultMessage: 'Forgot password',
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
    this.handleUsernameChange = this.handleUsernameChange.bind(this);

    this.state = {
      username: props.username,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.username,
    });
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

  handleUsernameChange(value) {
    this.setState({
      username: value,
    });
  }

  renderMessage() {
    const {
      isPending,
      error,
      username,
    } = this.props;

    let messageKey;

    if (isPending) {
      messageKey = 'pending';
    } else if (username && !error) {
      messageKey = 'success';
    } else {
      messageKey = 'prompt';
    }

    return (
      <p><FormattedMessage {...messages[messageKey]} /></p>
    );
  }

  renderForm() {
    const {
      intl,
      isPending,
    } = this.props;

    if (isPending) {
      return null;
    }

    const {
      username,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <LineInput
          autoComplete="username email"
          name="username"
          placeholder={intl.formatMessage(messages.username)}
          type="text"
          value={username}
          onChange={this.handleUsernameChange}
        />
        <PasswordInput
          autoComplete="current-password"
          name="password"
          placeholder={intl.formatMessage(messages.password)}
        />
        <div>
          <Button type="submit">
            <FormattedMessage {...messages.submit} />
          </Button>

          <Link
            to={{
              pathname: '/resetpw',
              state: {
                username,
              },
            }}
          >
            <FormattedMessage {...messages.forgotPassword} />
          </Link>
        </div>
      </form>
    );
  }

  renderError() {
    const {
      error,
      isPending,
    } = this.props;

    if (isPending || !error) {
      return undefined;
    }

    const desc = error.getIn(['response', 'data', 'error_description']);

    let messageKey;

    if (desc) {
      messageKey = errorMessageMap[desc];
    } else {
      messageKey = errorMessageMap[error.get('message')];
    }

    messageKey = messageKey || 'error';

    return (
      <Notification
        id="loginForm.error"
        message={messages[messageKey]}
        showCloseButton={false}
        status="error"
      />
    );
  }

  render() {
    return (
      <div className={styles.common}>
        <h2><FormattedMessage {...messages.title} /></h2>
        {this.renderMessage()}
        {this.renderForm()}
        {this.renderError()}
      </div>
    );
  }
}

LoginForm.contextTypes = contextTypes;
LoginForm.propTypes = propTypes;

export default injectIntl(LoginForm);
