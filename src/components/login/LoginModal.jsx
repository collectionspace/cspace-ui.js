import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Modal } from 'cspace-layout';
import LoginForm from './LoginForm';

const renderButtonBar = () => null;

const messages = defineMessages({
  title: {
    id: 'loginModal.title',
    description: 'The title of the login modal.',
    defaultMessage: 'Sign In',
  },
});

const propTypes = {
  isLoginPending: PropTypes.bool,
  isLoginSuccess: PropTypes.bool,
  isLoginWindowOpen: PropTypes.bool,
  isLoginWindowOpenFailed: PropTypes.bool,
  isOpen: PropTypes.bool,
  loginError: PropTypes.instanceOf(Immutable.Map),
  onCloseButtonClick: PropTypes.func,
  openLoginWindow: PropTypes.func,
};

export default function LoginModal(props) {
  const {
    isLoginPending,
    isLoginSuccess,
    isLoginWindowOpen,
    isLoginWindowOpenFailed,
    isOpen,
    loginError,
    onCloseButtonClick,
    openLoginWindow,
  } = props;

  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    if (isLoginSuccess && onCloseButtonClick) {
      onCloseButtonClick();
    }
  }, [isLoginSuccess]);

  return (
    <Modal
      isOpen={isOpen}
      title={<h1><FormattedMessage {...messages.title} /></h1>}
      closeButtonClassName="material-icons"
      closeButtonLabel="close"
      renderButtonBar={renderButtonBar}
      onCloseButtonClick={onCloseButtonClick}
    >
      <LoginForm
        isLoginExpired
        isLoginPending={isLoginPending}
        isLoginSuccess={isLoginSuccess}
        isLoginWindowOpen={isLoginWindowOpen}
        isLoginWindowOpenFailed={isLoginWindowOpenFailed}
        loginError={loginError}
        openLoginWindow={openLoginWindow}
        showPrompt
      />
    </Modal>
  );
}

LoginModal.propTypes = propTypes;
