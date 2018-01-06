import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import { components as inputComponents } from 'cspace-input';
import styles from '../../../styles/cspace-ui/LoginButton.css';

const { Button } = inputComponents;

const messages = defineMessages({
  label: {
    id: 'loginButton.label',
    description: 'Label of the login button.',
    defaultMessage: 'Sign in',
  },
});

export default function LoginButton(props) {
  return (
    <Button
      className={styles.common}
      icon
      name="login"
      {...props}
    >
      <FormattedMessage {...messages.label} />
    </Button>
  );
}

