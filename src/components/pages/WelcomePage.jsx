import React from 'react';
import { Helmet } from 'react-helmet';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import About from '../sections/About';
import LoginForm from '../login/LoginForm';
import styles from '../../../styles/cspace-ui/WelcomePage.css';

const propTypes = {
  intl: intlShape.isRequired,
};

const messages = defineMessages({
  title: {
    id: 'welcomePage.title',
    description: 'Title of the welcome page.',
    defaultMessage: 'Welcome',
  },
});

function WelcomePage(props) {
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

WelcomePage.propTypes = propTypes;

export default injectIntl(WelcomePage);
