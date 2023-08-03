import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Modal } from 'cspace-layout';
import LoginForm from './LoginForm';

const renderButtonBar = () => null;

const messages = defineMessages({
  title: {
    id: 'loginModal.title',
    description: 'The title of the login modal.',
    defaultMessage: 'Authorization Required',
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
      <LoginForm isExpired openNewWindow showPrompt />
    </Modal>
  );
}

LoginModal.propTypes = propTypes;
