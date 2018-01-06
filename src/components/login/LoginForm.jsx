import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
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
  formId: PropTypes.string,
  intl: PropTypes.object.isRequired,
  isExpired: PropTypes.bool,
  isPending: PropTypes.bool,
  isSuccess: PropTypes.bool,
  username: PropTypes.string,
  error: PropTypes.object,
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
      isSuccess,
      onSuccess,
    } = this.props;

    if (onSuccess && isSuccess && !prevProps.isSuccess) {
      onSuccess();
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
    } = this.props;

    if (isPending) {
      return null;
    }

    const {
      username,
    } = this.state;

    return (
      <form id={formId} onSubmit={this.handleSubmit}>
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
