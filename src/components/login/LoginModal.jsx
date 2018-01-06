import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Modal } from 'cspace-layout';
import LoginFormContainer from '../../containers/login/LoginFormContainer';

const formId = 'loginModal.loginForm';

const renderButtonBar = () => null;

const messages = defineMessages({
  title: {
    id: 'loginModal.title',
    description: 'The title of the login modal.',
    defaultMessage: 'Sign In',
  },
});

const propTypes = {
  isOpen: PropTypes.bool,
  onCloseButtonClick: PropTypes.func,
};

export default function LoginModal(props) {
  const {
    isOpen,
    onCloseButtonClick,
  } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      title={<h1><FormattedMessage {...messages.title} /></h1>}
      closeButtonClassName="material-icons"
      closeButtonLabel="close"
      renderButtonBar={renderButtonBar}
      onCloseButtonClick={onCloseButtonClick}
    >
      <LoginFormContainer
        formId={formId}
        isExpired
        showForgotLink={false}
        showHeader={false}
      />
    </Modal>
  );
}

LoginModal.modalName = 'LoginModal';
LoginModal.propTypes = propTypes;
