import React, { Component, PropTypes } from 'react';
import { Button, LineInput, PasswordInput } from 'cspace-input';
import styles from '../../styles/cspace-ui/LoginForm.css';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      onSuccess,
      isPending,
      response,
    } = this.props;

    if (onSuccess) {
      const isSuccess = (prevProps.isPending && !isPending && response);

      if (isSuccess) {
        onSuccess();
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      onSubmit,
    } = this.props;

    if (onSubmit) {
      const form = event.target;
      const username = form.username.value;
      const password = form.password.value;

      onSubmit(username, password);
    }
  }

  renderPending() {
    const {
      username,
    } = this.props;

    return (
      <div>Signing in {username}...</div>
    );
  }

  renderSuccess() {
    return (
      <div>Success!</div>
    );
  }

  renderMessage() {
    const {
      error,
    } = this.props;

    if (!error) {
      return (
        <p>Please sign in to continue.</p>
      );
    }

    const message = error.response.data.error_description;

    return (
      <p>
        Sign in failed: {message}<br />
        Please try again.
      </p>
    );
  }

  renderForm() {
    const {
      username,
    } = this.props;

    return (
      <div>
        <h2>Sign In</h2>
        
        {this.renderMessage()}

        <form className={styles.common} onSubmit={this.handleSubmit}>
          <LineInput name="username" type="text" placeholder="Email" value={username} />
          <PasswordInput name="password" type="password" placeholder="Password" />
          <Button>Sign in</Button>
        </form>
      </div>
    );
  }

  render() {
    const {
      isPending,
      response,
    } = this.props;

    if (isPending) {
      return this.renderPending();
    }

    if (response) {
      return this.renderSuccess();
    }

    return this.renderForm();
  }
}

LoginForm.propTypes = {
  isPending: PropTypes.bool,
  username: PropTypes.string,
  response: PropTypes.object,
  error: PropTypes.object,
  onSubmit: PropTypes.func,
  onSuccess: PropTypes.func,
};
