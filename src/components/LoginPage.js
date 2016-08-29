import React from 'react';
import { withRouter } from 'react-router';

import LoginForm from '../containers/LoginForm';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  
    this.onSuccess = this.onSuccess.bind(this);
  }
  
  onSuccess() {
    const {
      router,
      continuation,
    } = this.props;
    
    router.replace(continuation);
  }
  
  render() {
    return (
      <LoginForm onSuccess={this.onSuccess}/>
    );
  }
}

LoginPage.propTypes = {
  router: React.PropTypes.object.isRequired,
  continuation: React.PropTypes.string,
};

LoginPage.defaultProps = {
  continuation: '/',
};

export default withRouter(LoginPage);
