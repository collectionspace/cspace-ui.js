import React, { Component, PropTypes } from 'react';

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
        window.setTimeout(onSuccess, 100);
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
  
  renderError() {
    const {
      error,
    } = this.props;
    
    if (!error) {
      return null;
    }
    
    return (
      <div>
        <div>Error: {error.response.data.error_description}!</div>
        <div>Try again.</div>
      </div>
    );
  }
  
  renderForm() {
    const {
      username,
    } = this.props;

    return (
      <div>
        {this.renderError()}

        <form onSubmit={this.handleSubmit}>
          <input name="username" type="text" placeholder="Email" defaultValue={username}/><br/>
          <input name="password" type="password" placeholder="Password"/><br/>
          <button>Sign in</button>
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
}
