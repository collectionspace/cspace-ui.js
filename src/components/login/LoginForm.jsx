import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../styles/cspace-ui/LoginForm.css';
import LoginLink from './LoginLink';

const messages = defineMessages({
  prompt: {
    id: 'loginForm.prompt',
    description: 'The prompt displayed on the login form when the user is not logged in.',
    defaultMessage: 'Please sign in to continue.',
  },
  expiredPrompt: {
    id: 'loginForm.expiredPrompt',
    description: 'The prompt displayed on the login form when the login session has expired.',
    defaultMessage: 'Your authorization has expired. Please renew your session to continue.',
  },
  newWindowNote: {
    id: 'loginForm.newWindowNote',
    description: 'The message displayed on the login form to indicate that a new window will be opened.',
    defaultMessage: '(opens a new window)',
  },
  newWindowOpened: {
    id: 'loginForm.newWindowOpened',
    description: 'The message displayed on the login form when an authorization pop-up has been opened.',
    defaultMessage: 'Authorization is in progress in another browser window. You may be prompted to sign in again in that window.',
  },
  newWindowError: {
    id: 'loginForm.newWindowError',
    description: 'The message displayed on the login form when an authorization pop-up fails to open.',
    defaultMessage: 'The authorization window could not be opened. Please allow pop-ups for this site.',
  },
});

const propTypes = {
  isExpired: PropTypes.bool,
  openNewWindow: PropTypes.bool,
  showPrompt: PropTypes.bool,
};

const defaultProps = {
  isExpired: false,
  openNewWindow: false,
  showPrompt: false,
};

export default function LoginForm(props) {
  const {
    isExpired,
    openNewWindow,
    showPrompt,
  } = props;

  const [isNewWindowOpened, setNewWindowOpened] = useState();
  const [isNewWindowError, setNewWindowError] = useState();

  let prompt = null;

  if (showPrompt) {
    const messageKey = isExpired
      ? 'expiredPrompt'
      : 'prompt';

    prompt = (
      <p><FormattedMessage {...messages[messageKey]} /></p>
    );
  }

  return (
    <div className={styles.common}>
      {isNewWindowOpened && (
        <FormattedMessage {...messages.newWindowOpened} />
      )}

      {!isNewWindowOpened && (
        <>
          {prompt}

          <p>
            <LoginLink
              isExpired={isExpired}
              openNewWindow={openNewWindow}
              onNewWindowOpen={() => setNewWindowOpened(true)}
              onNewWindowError={() => setNewWindowError(true)}
            />
            {openNewWindow && <FormattedMessage {...messages.newWindowNote} />}
          </p>
        </>
      )}

      {isNewWindowError && (
        <FormattedMessage {...messages.newWindowError} />
      )}
    </div>
  );
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;
