/* global window */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styles from '../../../styles/cspace-ui/LoginLink.css';

const propTypes = {
  isExpired: PropTypes.bool,
  openNewWindow: PropTypes.bool,
  onNewWindowOpen: PropTypes.func,
  onNewWindowError: PropTypes.func,
};

const defaultProps = {
  isExpired: false,
  openNewWindow: false,
  onNewWindowOpen: null,
  onNewWindowError: null,
};

const messages = defineMessages({
  label: {
    id: 'loginLink.label',
    description: 'Label of the link to log in.',
    defaultMessage: 'Sign in',
  },
  renew: {
    id: 'loginLink.renew',
    description: 'Label of the link to log in when the authorization token has expired.',
    defaultMessage: 'Renew session',
  },
});

export default function LoginLink(props) {
  const {
    isExpired,
    onNewWindowOpen,
    onNewWindowError,
    openNewWindow,
  } = props;

  const authorizePageUrl = '/authorize';

  let handleClick;

  if (openNewWindow) {
    handleClick = (event) => {
      event.preventDefault();

      const popupWidth = 550;
      const popupHeight = 800;

      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      const left = (screenWidth - popupWidth) / 2;
      const top = (screenHeight - popupHeight) / 2;

      const popup = window.open(
        authorizePageUrl,
        'cspace-login',
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`,
      );

      if (popup) {
        if (onNewWindowOpen) {
          onNewWindowOpen();
        }
      } else if (onNewWindowError) {
        onNewWindowError();
      }
    };
  }

  const message = isExpired ? messages.renew : messages.label;

  return (
    <Link className={styles.common} to={authorizePageUrl} onClick={handleClick}>
      <FormattedMessage {...message} />
    </Link>
  );
}

LoginLink.propTypes = propTypes;
LoginLink.defaultProps = defaultProps;
