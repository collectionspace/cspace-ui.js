import React from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import About from '../sections/About';
import LoginForm from '../login/LoginForm';
import styles from '../../../styles/cspace-ui/LoginPage.css';

const propTypes = {
  intl: intlShape.isRequired,
};

const messages = defineMessages({
  title: {
    id: 'loginPage.title',
    description: 'Title of the login page.',
    defaultMessage: 'Welcome',
  },
});

function LoginPage(props) {
  const {
    intl,
  } = props;

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage(messages.title)}</title>
      </Helmet>
      <div className={styles.common}>
        <div className={styles.about}>
          <About />
        </div>

        <div className={styles.login}>
          <LoginForm />
        </div>
      </div>
    </>
  );
}

LoginPage.propTypes = propTypes;

export default injectIntl(LoginPage);
