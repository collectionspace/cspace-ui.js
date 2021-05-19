import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages, injectIntl, intlShape, FormattedMessage,
} from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import { components as inputComponents } from 'cspace-input';
import LoginButton from './LoginButton';
import Notification from '../notification/Notification';
import styles from '../../../styles/cspace-ui/LoginForm.css';

const { LineInput, PasswordInput } = inputComponents;

const messages = defineMessages({
  title: {
    id: 'loginForm.title',
    description: 'Title displayed above the login form.',
    defaultMessage: 'Sign In',
  },
  prompt: {
    id: 'loginForm.prompt',
    description: 'The prompt displayed on the login form when the user is not logged in.',
    defaultMessage: 'Please sign in to continue.',
  },
  expiredPrompt: {
    id: 'loginForm.expiredPrompt',
    description: 'The prompt displayed on the login form when the login session has expired.',
    defaultMessage: 'Your session has expired. Please sign in again to continue.',
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
  ERR_INVALID_CREDENTIALS: {
    id: 'loginForm.ERR_INVALID_CREDENTIALS',
    description: 'Error message displayed when incorrect credentials were entered during login.',
    defaultMessage: 'Sign in failed. Incorrect username/password.',
  },
  ERR_NETWORK: {
    id: 'loginForm.ERR_NETWORK',
    description: 'Error message displayed when there is a network error during login.',
    defaultMessage: 'Sign in failed. Unable to reach the CollectionSpace server.',
  },
  ERR_WRONG_TENANT: {
    id: 'loginForm.ERR_WRONG_TENANT',
    description: 'Error message displayed when the logged in user belongs to the wrong tenant.',
    defaultMessage: 'Sign in failed. The user is not registered to this CollectionSpace tenant.',
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
  forgotPassword: {
    id: 'loginForm.forgotPassword',
    description: 'Text of the forgot password link.',
    defaultMessage: 'Forgot password',
  },
});

const contextTypes = {
  config: PropTypes.shape({
    tenantId: PropTypes.string,
  }),
};

const propTypes = {
  formId: PropTypes.string,
  intl: intlShape.isRequired,
  isExpired: PropTypes.bool,
  isPending: PropTypes.bool,
  isSuccess: PropTypes.bool,
  username: PropTypes.string,
  error: PropTypes.instanceOf(Immutable.Map),
  showForgotLink: PropTypes.bool,
  showHeader: PropTypes.bool,
  login: PropTypes.func,
  onSuccess: PropTypes.func,
};

const defaultProps = {
  showForgotLink: true,
  showHeader: true,
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handlePasswordInputApi = this.handlePasswordInputApi.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleUsernameInputApi = this.handleUsernameInputApi.bind(this);

    this.state = {
      username: props.username,
    };
  }

  componentDidMount() {
    const {
      username,
    } = this.props;

    // If there is a username, focus the password input. Otherwise, focus the username input.

    if (username && this.passwordInputApi) {
      this.passwordInputApi.focus();
    } else if (this.usernameInputApi) {
      this.usernameInputApi.focus();
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.username,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      error,
      isSuccess,
      username,
      onSuccess,
    } = this.props;

    const {
      error: prevError,
      username: prevUsername,
    } = prevProps;

    if (this.passwordInputApi) {
      // If the username has been set, focus the password.

      if (username && !prevUsername) {
        this.passwordInputApi.focus();
      }

      // If login fails, focus the password.

      if (error && !prevError) {
        this.passwordInputApi.focus();
      }
    }

    if (onSuccess && isSuccess && !prevProps.isSuccess) {
      onSuccess();
    }
  }

  handlePasswordInputApi(api) {
    this.passwordInputApi = api;
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

  handleUsernameInputApi(api) {
    this.usernameInputApi = api;
  }

  handleUsernameChange(value) {
    this.setState({
      username: value,
    });
  }

  renderHeader() {
    const {
      showHeader,
    } = this.props;

    if (!showHeader) {
      return null;
    }

    return (
      <h2><FormattedMessage {...messages.title} /></h2>
    );
  }

  renderPrompt() {
    const {
      isExpired,
      isPending,
      isSuccess,
    } = this.props;

    let messageKey;

    if (isPending) {
      messageKey = 'pending';
    } else if (isSuccess) {
      messageKey = 'success';
    } else if (isExpired) {
      messageKey = 'expiredPrompt';
    } else {
      messageKey = 'prompt';
    }

    return (
      <p><FormattedMessage {...messages[messageKey]} /></p>
    );
  }

  renderButtonBar() {
    const {
      showForgotLink,
    } = this.props;

    const {
      username,
    } = this.state;

    let forgotLink;

    if (showForgotLink) {
      forgotLink = (
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
      );
    } else {
      forgotLink = <div />;
    }

    return (
      <div>
        {forgotLink}
        <LoginButton type="submit" />
      </div>
    );
  }

  renderForm() {
    const {
      formId,
      intl,
      isPending,
      isSuccess,
    } = this.props;

    if (isPending || isSuccess) {
      return null;
    }

    const {
      username,
    } = this.state;

    return (
      <form id={formId} onSubmit={this.handleSubmit}>
        <LineInput
          autoComplete="username email"
          id="username"
          placeholder={intl.formatMessage(messages.username)}
          type="text"
          value={username}
          api={this.handleUsernameInputApi}
          onChange={this.handleUsernameChange}
        />

        <PasswordInput
          autoComplete="current-password"
          id="password"
          placeholder={intl.formatMessage(messages.password)}
          api={this.handlePasswordInputApi}
        />

        {this.renderButtonBar()}
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

    const messageKey = error.get('code') || 'error';

    return (
      <Notification
        id="loginForm.error"
        items={[{
          message: messages[messageKey],
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
    } = this.props;

    let className;

    if (isPending) {
      className = styles.pending;
    } else if (isSuccess) {
      className = styles.success;
    } else {
      className = styles.common;
    }

    return (
      <div className={className}>
        {this.renderHeader()}
        {this.renderPrompt()}
        {this.renderForm()}
        {this.renderError()}
      </div>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;
LoginForm.contextTypes = contextTypes;

export default injectIntl(LoginForm);
