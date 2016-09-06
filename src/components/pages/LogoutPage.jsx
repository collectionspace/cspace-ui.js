import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import About from '../sections/About';
import LogoutIndicatorContainer from '../../containers/login/LogoutIndicatorContainer';
import styles from '../../styles/cspace-ui/LoginPage.css';

class LogoutPage extends Component {
  constructor(props) {
    super(props);

    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess() {
    const {
      router,
    } = this.props;

    router.replace('/login');
  }

  render() {
    return (
      <div className={styles.common}>
        <div className={styles.about}><About /></div>
        <div className={styles.login}><LogoutIndicatorContainer onSuccess={this.onSuccess} /></div>
      </div>
    );
  }
}

LogoutPage.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(LogoutPage);
