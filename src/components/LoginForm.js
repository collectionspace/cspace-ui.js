import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentDidUpdate() {
    const {
      response,
      onSuccess,
    } = this.props;
    
    if (response && onSuccess) {
      setTimeout(onSuccess, 0);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;

    this.props.login(username, password);
  }
  
  render() {
    const {
      isPending,
      username,
      response,
      error,
    } = this.props;
    
    if (isPending) {
      return (
        <div>Signing in {username}...</div>
      );
    }
    
    if (response) {
      return (
        <div>Success!</div>
      )
    }
    
    const errorMessage = error
      ? <p>Error! Try again.</p>
      : null;
    
    return (
      <div>
        {errorMessage}
      
        <form onSubmit={this.handleSubmit}>
          <input name="username" type="text" placeholder="Email" defaultValue={username}/><br/>
          <input name="password" type="password" placeholder="Password"/><br/>
          <button>Sign in</button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: React.PropTypes.func.isRequired,
  onSuccess: React.PropTypes.func,
  isPending: React.PropTypes.bool,
  username: React.PropTypes.string,
  response: React.PropTypes.object,
  error: React.PropTypes.object,
}
