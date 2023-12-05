import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styles from '../../../styles/cspace-ui/LoginLink.css';

const propTypes = {
  openLoginWindow: PropTypes.func,
};

const defaultProps = {
  openLoginWindow: null,
};

const contextTypes = {
  config: PropTypes.shape({
    recordTypes: PropTypes.object,
  }),
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

export default function LoginLink(props, context) {
  const {
    openLoginWindow,
  } = props;

  const authorizePath = '/authorize';

  let handleClick;

  if (openLoginWindow) {
    const {
      config,
    } = context;

    const {
      basename,
    } = config;

    handleClick = (event) => {
      event.preventDefault();

      openLoginWindow(`${basename}${authorizePath}`);
    };
  }

  const message = openLoginWindow ? messages.openLabel : messages.label;

  return (
    <Link className={styles.common} to={authorizePath} onClick={handleClick}>
      <FormattedMessage {...message} />
    </Link>
  );
}

LoginLink.propTypes = propTypes;
LoginLink.defaultProps = defaultProps;
LoginLink.contextTypes = contextTypes;
