import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { AUTHORIZE_PAGE_URL } from '../../actions/login';
import styles from '../../../styles/cspace-ui/LoginLink.css';

const propTypes = {
  openLoginWindow: PropTypes.func,
};

const defaultProps = {
  openLoginWindow: null,
};

const messages = defineMessages({
  label: {
    id: 'loginLink.label',
    description: 'Label of the link to log in.',
    defaultMessage: 'Sign in',
  },
  openLabel: {
    id: 'loginLink.openLabel',
    description: 'Label of the link to open a login window.',
    defaultMessage: 'Open sign in window',
  },
});

export default function LoginLink(props) {
  const {
    openLoginWindow,
  } = props;

  let handleClick;

  if (openLoginWindow) {
    handleClick = (event) => {
      event.preventDefault();

      openLoginWindow();
    };
  }

  const message = openLoginWindow ? messages.openLabel : messages.label;

  return (
    <Link className={styles.common} to={AUTHORIZE_PAGE_URL} onClick={handleClick}>
      <FormattedMessage {...message} />
    </Link>
  );
}

LoginLink.propTypes = propTypes;
LoginLink.defaultProps = defaultProps;
